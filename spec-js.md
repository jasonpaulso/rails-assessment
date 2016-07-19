# Specifications for the Rails with jQuery Assessment

Specs:
- [x] Use jQuery for implementing new requirements
- [x] Include a show page rendered using jQuery and an Active Model Serialization JSON backend. 
  - networks#show and shows#show are rendered via jquery and serializer.
- [x] Include an index page rendered using jQuery and an Active Model Serialization JSON backend.
  - networks#index, shows#index, and #static#index render via via jquery and serializer.
- [x] Include at least one has_many relationship in information rendered via JSON
  - networks#show render Network has_many Shows relationship via JSON.
- [x] Include at least one link that loads or updates a resource without reloading the page
  - throughout app there is a "show more" button that loads a shows description without reloading the page - via ajax/json either from the remote API or local database. Additionally, the API seach function renders the search results within whatever page the user is on, without reloading the page. 
- [x] Translate JSON responses into js model objects
  - show search results are translated into js model via ShowSearchResult() in tvTracker.js. 
- [x] At least one of the js model objects must have at least one method added by your code to the prototype
  The ShowSearchResult() function has ShowSearchResult.prototype.convertShowTime, which converts the 24hr air time from the API source to standard 12 hr am/pm time.

Confirm
- [x] You have a large number of small Git commits
- [x] Your commit messages are meaningful
- [x] You made the changes in a commit that relate to the commit message
- [x] You don't include changes in a commit that aren't related to the commit message
  - I would liked to have done a better job with this aspect. Often minor changes I make/made were tangentially related to or only noticed when working to implement or fix a certain feature or functionality.
