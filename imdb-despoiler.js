// Copyright (c) 2013 Julius Schlosburg
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in the
// Software without restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
// Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
// AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// Globals container
var despoiler = {
    // This will keep a copy of the elements so that the effect can be easily
    // turned on and off
    'cast_members' : [],
    
    // Keep track of state
    'spoilers_on' : false,
    
    // Pull this out since it's used twice. Matches the character spoiler
    // element parents both on the show page and the detailed cast page
    'character_listings' : $('td.character > div, td.char'),
    
    'actor_episodes' : $('.filmo-episodes'),

    'strs' : {
        'filmography_section_keyword' : 'Filmography',
        'tv_series_section_keyword': '(TV series)'
    },
    
    // Figure out where to insert the toggle button. The best element is
    // different on different pages
    'get_button_parent' : function () {
        if ($('td.castlist_label').length > 0) {
            return $('td.castlist_label');
        } else if ($('div#tn15content > h5').length > 0) { 
            return $('div#tn15content > h5');
        } else if ($('#hide-Actor').length > 0) {
            return $('div.article > h2');
        }
    }
}

function hide_spoilers () {
    despoiler.character_listings.each(function (index) {
        // Take a copy of the innerHTML before repacing it - it has to be put back
        // later if the toggle button is clicked
        despoiler.cast_members[index] = $(this).html();
        
        // For each div child to each table data element of class "character," 
        // replace the innerHTML with only what comes before the last '('
        // character. The td looks like this:
        //
        // <div>
        //     <a onclick="(new Image()).src='someurl';" href="someurl">
        //         Castmember Name
        //     </a>
        //     (137 episodes, 2003-2010)    
        // </div>
        // 
        // I was previously stripping out everything but the anchor, but found
        // that some of the divs had only text. So far I haven't run into any
        // that don't have the spoiler in the last set of parentheses
        var replacement_text = $(this).html().split('(').slice(0,-1);
        $(this).html(replacement_text);
    });
    despoiler.actor_episodes.filter(function () {
        // Since we're here on the actor_episodes div, hide it.
        $(this).hide();
        // Now filter only the TV series elements
        return $(this).parent().html().indexOf(
            despoiler.strs.tv_series_section_keyword) >= 0;
    }).siblings('span.year_column').hide();
    despoiler.spoilers_on = false;
}

function show_spoilers () {
    // Put the innerHTML back into each of the listings
    despoiler.character_listings.each(function (index) {
        $(this).html(despoiler.cast_members[index]);
    });
    despoiler.actor_episodes.show()
    despoiler.spoilers_on = true;
}

// Add a button to toggle spoilers on and off. "td.castlist_label" is right at
// the top of the section with the spoilers, so it seems like a good place to
// put this.
$('<br><span class="spoiler_toggle">Toggle Spoilers</span>')
    .appendTo(despoiler.get_button_parent()).click(function () {
        if (despoiler.spoilers_on) {
            hide_spoilers(); 
        } else {
            show_spoilers(); 
        }
});

// Hide spoilers by default
hide_spoilers();
