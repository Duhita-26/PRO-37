class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide()
    background("LIGHTBLUE");
    textSize(30)
    fill("BLACK")
    text("RESULT OF THE QUIZ", 340, 50)
    text("------------------------------------", 320, 60)
    Contestant.getPlayerInfo()
    if(allContestants!==undefined){
      fill("BLUE");
      textSize(20);
      text("*NOTE : Contestant who answered correctlly are highlighted in green colour!*");
       var display_position = 230
       for(var plr in allContestants){
        var correct = 2
         if(correct==allContestants[plr].answer)
           fill("green")
           else fill("red")
           display_position+=30
           textSize(15)
           text(allContestants[plr].name+":"+allContestants[plr].answer, 250, display_position)
       }
    }
}
    
  }


