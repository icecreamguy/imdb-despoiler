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
    
    // Pull this out since it's used twice
    'character_listings' : $('td.character > div'),
}

function hide_spoilers(){
    despoiler.character_listings.each(function(index){
        // Take a copy of the innerHTML before repacing it - it has to be put back
        // later if the toggle button is clicked
        despoiler.cast_members[index] = $(this).html();
        
        // For each div child to each table data element of class "character," grab 
        // the anchor out of it's innerHTML. Replace the entire innerHTML with just 
        // the anchor. Because the td looks like this:
        //
        // <div>
        //     <a onclick="(new Image()).src='someurl';" href="someurl">
        //         Castmember Name
        //     </a>
        //     (137 episodes, 2003-2010)    
        // </div>
        //
        // replacing the div's innerHTML with just the anchor has the effect of
        // removing the episode information.
        $(this).html($(this).children('a'));
    });
    despoiler.spoilers_on = false;
}

function show_spoilers(){
    // Put the innerHTML back into each of the listings
    despoiler.character_listings.each(function(index){
        $(this).html(despoiler.cast_members[index]);
    });
    despoiler.spoilers_on = true;
}

// Add a button to toggle spoilers on and off. "td.castlist_label" is right at
// the top of the section with the spoilers, so it seems like a good place to
// put this.
$('<br><span class="spoiler_toggle">Toggle Spoilers</span>')
    .appendTo('td.castlist_label').click(function(){
        if (despoiler.spoilers_on){
            hide_spoilers(); }
        else{
            show_spoilers(); }
});

// Hide spoilers by default
hide_spoilers();
