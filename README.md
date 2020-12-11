# How to run this project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`


# MVP User Stories
  
1.	Users can add GitHub repos they want to keep track of.   App keeps track of added repos (e.g. using LocalStorage/IndexedDB) until application data is cleared.   No need for a formal user or authentication concept at this point.  
  
https://github.com/kjlevitz/repository-tracker/issues/1  

2.	Users can see the last release date associated with each repo.  
  
https://github.com/kjlevitz/repository-tracker/issues/2  
  
3.	Users can mark a release as seen (for example, this can be done in the sample UI below by opening the details view associated with each repo)  
  
https://github.com/kjlevitz/repository-tracker/issues/3  
  
4.	There is a visual indicator for repositories with new releases since they were last marked as seen.  
  
https://github.com/kjlevitz/repository-tracker/issues/4  
  
5.	There is a way to reload release data for all repos (e.g. by refreshing the app)  
  
https://github.com/kjlevitz/repository-tracker/issues/5  



# Optional improvements and User Stories

1.	Release notes / other data that we might want to present in a details view.

Potentially in a future release.

2.	Should this app work on mobile web?

It will work on mobile web, however, there will be extra scrolling required. 

3.	When to load/update data and what loading states should be there.

Data states are loaded from browser storage and updated via functions.

4.	Filter (or sort) repo list so as to easily see repos with new releases since we've last seen them

https://github.com/kjlevitz/repository-tracker/issues/6

5.	Other ways to categorize / search / filter repositories

https://github.com/kjlevitz/repository-tracker/issues/7

6.	Additional personal metadata associated with each repo.   E.g. the ability to mark a release as something to revisit / to updates in other projects.

Potentially in a future release.

7.	Some projects don't use GitHub releases.   Maybe we can use commit activity as a second data point?

Potentially in a future release.

8.	Desktop / mobile notifications

Potentially in a future release.

9.	How would you build a real server for this / turn this into a service that would store data beyond the local browser?

If this were going to be ran on a web server, I would use another storage solution to keep track of stored repositories. MongoDB comes to mind as a viable option.
