/**
 * Created by raphael on 3/15/17.
 */
module.exports = function(app){
    home = app.serverSide.controllers.home;
    app.get('/homeGETProfissionais', home.getProfissionais);
}
