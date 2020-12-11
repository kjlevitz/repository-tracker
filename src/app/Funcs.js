var request = require("request");

/* Used to hold Repository information
 */
class Repository {
  constructor(url, release_url, version, version_date, recent_update){
    this.url = url;
    this.release_url = release_url;
    this.version = version;
    this.version_date = version_date;
    this.recent_update = recent_update;
    this.next_update = "latest"
  }
}

/* Given a repo name add it to our locally stored list
 * string: repo_name
 * example:
 * addWatchedRepo("lumanu/gh-release-monitor")
 */
exports.addWatchedRepo = function addWatchedRepo(repo_name){
  const uri = "https://api.github.com/repos/" + repo_name + "/releases";
  request(
    {
        method: 'GET',
        uri: uri,
        headers: {'user-agent': 'node.js'}
    }, function (err, res) {
        if(err){console.log('error:', err)}
        try{
          let temp_repo_list = []
          let rel_url        = JSON.parse(res.body)[0].html_url;
          let ver            = JSON.parse(res.body)[0].tag_name;
          let ver_date       = JSON.parse(res.body)[0].published_at;
          let temp_repo      = new Repository(repo_name, rel_url, ver, ver_date, false);
          if(localStorage.getItem('repo_list')){
            temp_repo_list   = JSON.parse(localStorage.getItem('repo_list'));
            temp_repo_list.push(temp_repo);
            localStorage.setItem('repo_list', JSON.stringify(temp_repo_list));
            window.location.reload(true);
          } else{
            localStorage.setItem('repo_list', [temp_repo]);
            window.location.reload(true);
          }
        } catch(err){
            alert("Error, Repository not found");
            console.log("addWatchedRepo error = ", err);
        }
        
  });
}

/* Given a repo name remove it from our locally stored list
 * string: repo_name
 * example:
 * removeWatchedRepo("lumanu/gh-release-monitor")
 */
exports.removeWatchedRepo = function removeWatchedRepo(repo_name){
  let temp_repo_list = JSON.parse(localStorage.getItem('repo_list'));
  let cleaned_repo_list = []
  if(temp_repo_list == null){
    return;
  } else{
      for(let i = 0; i < temp_repo_list.length; i++){
        if(repo_name == temp_repo_list[i].url){
          //Exclue from cleaned_repo_list
        } else{
            cleaned_repo_list.push(temp_repo_list[i])
        }
      }
      localStorage.setItem('repo_list', JSON.stringify(cleaned_repo_list));
      window.location.reload(true);
  }
}

/* Given a repo name confirm recent update notification
 * string: repo_name
 * example:
 * confirmUpdate("lumanu/gh-release-monitor")
 */
exports.confirmUpdate = function confirmUpdate(repo_name){
  let temp_repo_list = JSON.parse(localStorage.getItem('repo_list'));
  let updated_repo_list = []
  if(temp_repo_list == null){
    return;
  } else{
      for(let i = 0; i < temp_repo_list.length; i++){
        if(repo_name == temp_repo_list[i].url){
          temp_repo_list[i].recent_update = false;
          temp_repo_list[i].version = temp_repo_list[i].next_update;
          temp_repo_list[i].next_update = "latest";
          updated_repo_list.push(temp_repo_list[i]);
        }else{
          updated_repo_list.push(temp_repo_list[i]);
        }
        
      }
      localStorage.setItem('repo_list', JSON.stringify(updated_repo_list));
      window.location.reload(true);
  }
}

/* checkForUpdates
 * scope: All stored repositories
 * notes: This will run against all scored repos, it will require a refresh when finished.
 * example:
 * checkForUpdates()
 */
exports.checkForUpdates = function checkForUpdates(){
  let temp_repo_list = JSON.parse(localStorage.getItem('repo_list'));
  let updated_repo_list = []
  if(temp_repo_list == null){
    return;
  } else{
      for (let i = 0; i < temp_repo_list.length; i++){
        const uri = "https://api.github.com/repos/" + temp_repo_list[i].url + "/releases";
        request(
          {
              method: 'GET',
              uri: uri,
              headers: {'user-agent': 'node.js'}
          }, function (err, res) {
              if(err){console.log('error:', err)}
              try{
                if((JSON.parse(res.body)[0].tag_name != temp_repo_list[i].version) && !temp_repo_list[i].version.includes("*")){
                  temp_repo_list[i].recent_update = true;
                  temp_repo_list[i].version = temp_repo_list[i].version + " *(" +  JSON.parse(res.body)[0].tag_name  + ")";
                  temp_repo_list[i].next_update = JSON.parse(res.body)[0].tag_name;
                  updated_repo_list.push(temp_repo_list[i])
                  localStorage.setItem('repo_list', JSON.stringify(updated_repo_list));
                } else{
                  updated_repo_list.push(temp_repo_list[i])
                  localStorage.setItem('repo_list', JSON.stringify(updated_repo_list));
                }
              } catch(err){
                  console.log("updatedRecently error = ", err);
                  return;
              }
        });
      }
      //window.location.reload(true);
  }
}

