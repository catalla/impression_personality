/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and
* insert them into the document.
*
********************/

/********************
* STROOP TEST       *
********************/
var StroopExperiment = function() {

	var wordon, // time word is presented
	    listening = false;

	// Stimuli for a basic Stroop experiment
	// var stims = [
	// 		["SHIP", "red", "unrelated"],
	// 		["MONKEY", "green", "unrelated"],
	// 		["ZAMBONI", "blue", "unrelated"],
	// 		["RED", "red", "congruent"],
	// 		["GREEN", "green", "congruent"],
	// 		["BLUE", "blue", "congruent"],
	// 		["GREEN", "red", "incongruent"],
	// 		["BLUE", "green", "incongruent"],
	// 		["RED", "blue", "incongruent"]
	// 	];

		var stims = [['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/132670.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/046077.jpg', 'ground_truth', '0', '1', 39, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/086414.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/152827.jpg', 'ground_truth', '1', '0', 21, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/032883.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/139565.jpg', 'ground_truth', '0', '1', 2, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/062871.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/096230.jpg', 'ground_truth', '1', '0', 8, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/073886.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/127601.jpg', 'ground_truth', '1', '0', 29, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/105137.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/003364.jpg', 'ground_truth', '1', '0', 36, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/037932.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/050181.jpg', 'ground_truth', '0', '1', 33, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/021576.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/053836.jpg', 'ground_truth', '1', '0', 35, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/144125.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/085594.jpg', 'ground_truth', '0', '1', 9, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/048954.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/058879.jpg', 'ground_truth', '0', '1', 27, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/054159.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/171608.jpg', 'ground_truth', '0', '1', 24, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/053640.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/124399.jpg', 'ground_truth', '0', '1', 12, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/109934.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/051703.jpg', 'ground_truth', '0', '1', 0, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/163099.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/002208.jpg', 'ground_truth', '0', '1', 3, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/150134.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/083021.jpg', 'ground_truth', '1', '0', 26, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/003364.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/105137.jpg', 'ground_truth', '0', '1', 36, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/086414.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/152827.jpg', 'ground_truth', '1', '0', 21, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/143885.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/157343.jpg', 'ground_truth', '0', '1', 10, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/094964.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/052930.jpg', 'ground_truth', '1', '0', 23, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/066878.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/154412.jpg', 'ground_truth', '1', '0', 19, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/016460.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/154490.jpg', 'ground_truth', '0', '1', 14, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/172533.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/076422.jpg', 'ground_truth', '0', '1', 15, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/037451.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/059649.jpg', 'ground_truth', '1', '0', 17, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/123211.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/030595.jpg', 'ground_truth', '0', '1', 31, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/038546.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/063159.jpg', 'ground_truth', '0', '1', 7, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/178011.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/195507.jpg', 'ground_truth', '0', '1', 32, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/048954.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/058879.jpg', 'ground_truth', '0', '1', 27, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/031716.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/153478.jpg', 'ground_truth', '0', '1', 38, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/002208.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/163099.jpg', 'ground_truth', '1', '0', 3, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/161851.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/050911.jpg', 'ground_truth', '0', '1', 13, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/174697.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/197796.jpg', 'ground_truth', '0', '1', 22, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/050911.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/161851.jpg', 'ground_truth', '1', '0', 13, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/198203.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/066620.jpg', 'ground_truth', '0', '1', 30, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/179277.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/058057.jpg', 'ground_truth', '0', '1', 34, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/094964.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/052930.jpg', 'ground_truth', '1', '0', 23, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/069891.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/101536.jpg', 'ground_truth', '1', '0', 4, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/154490.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/016460.jpg', 'ground_truth', '1', '0', 14, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/127601.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/073886.jpg', 'ground_truth', '0', '1', 29, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/183108.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/161106.jpg', 'ground_truth', '0', '1', 28, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/021977.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/155810.jpg', 'ground_truth', '0', '1', 16, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/026582.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/202381.jpg', 'ground_truth', '0', '1', 11, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/146338.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/126710.jpg', 'ground_truth', '1', '0', 18, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/195507.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/178011.jpg', 'ground_truth', '1', '0', 32, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/142159.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/110505.jpg', 'ground_truth', '0', '1', 20, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/127936.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/164055.jpg', 'ground_truth', '1', '0', 25, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/042807.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/059098.jpg', 'ground_truth', '0', '1', 6, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/139565.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/032883.jpg', 'ground_truth', '1', '0', 2, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/063159.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/038546.jpg', 'ground_truth', '1', '0', 7, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/066878.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/154412.jpg', 'ground_truth', '1', '0', 19, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/081442.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/065232.jpg', 'ground_truth', '1', '0', 1, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/021977.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/155810.jpg', 'ground_truth', '0', '1', 16, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/109934.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/051703.jpg', 'ground_truth', '0', '1', 0, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/172533.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/076422.jpg', 'ground_truth', '0', '1', 15, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/186784.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/058718.jpg', 'ground_truth', '1', '0', 5, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/026582.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/202381.jpg', 'ground_truth', '0', '1', 11, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/144125.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/085594.jpg', 'ground_truth', '0', '1', 9, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/096230.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/062871.jpg', 'ground_truth', '0', '1', 8, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/124399.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/053640.jpg', 'ground_truth', '1', '0', 12, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/174697.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/197796.jpg', 'ground_truth', '0', '1', 22, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/028928.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_responsible/128593.jpg', 'ground_truth', '0', '1', 37, 0]];

	stims = _.shuffle(stims);

	var next = function() {
		if (stims.length===0) {
			finish();
		}
		else {
			stim = stims.shift();
			show_word( stim[0], stim[1] );
			wordon = new Date().getTime();
			listening = true;
			d3.select("#query").html('<p id="prompt">Type "A" for left face, "B" for right face.</p>');
		}
	};

	var response_handler = function(e) {
		if (!listening) return;

		var keyCode = e.keyCode,
			response;

		switch (keyCode) {
			case 65:
				// "A"
				response="1";
				break;
			case 66:
				// "B"
				response="0";
				break;
			default:
				response = "";
				break;
		}
		if (response.length>0) {
			listening = false;
			var hit = response == stim[3];
			var rt = new Date().getTime() - wordon;

			psiTurk.recordTrialData({'phase':"TEST",
                                     'im1':stim[0],
                                     'im2':stim[1],
                                     'tasktype':stim[2],
                                     'im1relation':stim[3],
				                     'im2relation':stim[4],
									 'pair_ind':stim[5],
									 'rep': stim[6],
                                     'hit':hit,
                                     'rt':rt}
                                   );
			remove_word();
			next();
		}
	};

	var finish = function() {
	    $("body").unbind("keydown", response_handler); // Unbind keys
	    currentview = new Questionnaire();
	};

	var show_word = function(image1, image2) {
		$('#stim').html('<img src='+image1+' width=50% /><img src='+image2+' width=50% />');

		// d3.select("#stim")
		// 	.append("div")
		// 	.attr("id","word")
		// 	.style("color",color)
		// 	.style("text-align","center")
		// 	.style("font-size","150px")
		// 	.style("font-weight","400")
		// 	.style("margin","20px")
		// 	.text(text);
	};

	var remove_word = function() {
		d3.select("#word").remove();
	};


	// Load the stage.html snippet into the body of the page
	psiTurk.showPage('stage.html');

	// Register the response handler that is defined above to handle any
	// key down events.
	$("body").focus().keydown(response_handler);

	// Start the test
	next();
};


/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});

	};

	prompt_resubmit = function() {
		document.body.innerHTML = error_message;
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		document.body.innerHTML = "<h1>Trying to resubmit...</h1>";
		reprompt = setTimeout(prompt_resubmit, 10000);

		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt);
                psiTurk.computeBonus('compute_bonus', function(){
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                });


			},
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});

	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function() {
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                });
            },
            error: prompt_resubmit});
	});


};

// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new StroopExperiment(); } // what you want to do when you are done with instructions
    );
});