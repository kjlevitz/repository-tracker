try{
  var return_data = JSON.parse(localStorage.getItem('repo_list'));
}catch(err){
  console.log("error retrieving return_data :: ", err);
}
if(return_data.length < 1){
  return_data = [{url: "-", release_url: "-", version: "-", version_date: "-", recent_update: "-"}]
}
export default return_data;