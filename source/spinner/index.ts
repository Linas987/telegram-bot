class Spinner {
	betAmount!:number;
	bettingOn!:number;

	startGame():string{
		// In a folder like this you can do stuff not directly related to your Telegram bot.
		// When your bot will need to fight dragons but doesnt do it by itself this is the right place to do it.
		return 'this is spinner text, betAmount '+ this.betAmount+" bettingOn "+this.bettingOn;
	}

	isStringANumber(string: string): boolean{
		return !isNaN(parseInt(string));
	}

	public handleStartgameEvent(params: Array<string>):string{
		const errorResult = this.errorCheck(params);
		let spinnerResults: string="";
		if(!errorResult){
			this.setBetAmount(parseInt(params[0]!));
			this.setBettingOn(parseInt(params[1]!));
			spinnerResults = this.startGame();
		}else{
			spinnerResults = errorResult;
		}

		return spinnerResults;
	}

	public errorCheck(params: Array<string>):  string {
		let error: string="";
		if(params[0]==null||params[1]==null){
			error = "missing 2 parameters, pleas enter numbers. syntax: /startgame <bet amount> <beting on>";
		}else{
			error=this.isStringANumber(params[0])?"":"first parameter must be a number ";
			error+=this.isStringANumber(params[1])?"":"second parameter must be a number";
		}
		return error;
	}

	public setBetAmount(betAmount:number){
		this.betAmount=betAmount
	}

	public setBettingOn(bettingOn:number){
		this.bettingOn=bettingOn
	}
}

export { Spinner };
