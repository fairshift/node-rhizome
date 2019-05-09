function onContentChange() {
	// when displayed content changes, crawl through DOM html code and map recognizable forms and template versions
	parseFeed( loadArticleTemplatePatterns() );
}

function loadArticleTemplatePatterns() {
	// each site would have a number of relevant content types, coming within several recognizable forms 
	//																		  (possibly versions thereof)
	var templates = [];
	return currentTemplates;
}

function parseFeed( currentTemplates ) {
	// crawl
}

function detectPattern() {
	// query database of patterns by included people (post author, commenters, reacting and mentioned people)
	// load synonyms, hyponyms, hypernyms, antonyms of recognizable word patterns used by involved people
	// regex on content and comments - by post author and commenters
	// image meta data
}

document.getElementById('clickme').addEventListener('click', parseFeed);

/*

Chrome / Firefox extension
- establishing a structure of roots - how data sequenced in a time series is interrelated by symbols demeaning topics, motivations and values?

Background script:
- while browsing a facebook feed (news or user profile), script extracts - posts and  meta data [template to figure out data fields - update dynamically, detect Facebook variations]
- finding patterns: current user selected (or preset) keywords go into feed subcategories (own profile); database is scavanged for feed's subcategories' - those of user currently on display
- when a match is detected, the post is inserted into a database temporarily [how to decide which posts should stay for longer?]

Feed augmentation function:
- when a post with a matched keyword is detected, related posts by the same user are linked in a subtle way (small icon)
- if settings are set to filter out certain keywords, feed is cleared of posts not matching, saving some to a temporary database [has a capacity, limited by the device (one digit number of mb, and up to 100mb)]
- if settings are change to show all, the feed is rebuilt out of the temporary database

Popup:
- icon changes if current website is supported by the service
- user's keyword preset shows [all; list of each] > on click the feed changes, calling feed augmentation function

Backend database server:
- currently just local storage (so to prescribe format of data before doing any backend coding at all)

*/