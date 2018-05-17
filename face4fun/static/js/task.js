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

		var stims = [['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087417_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087417_6.png', 'Same', '0', '1', 25, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087410_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087410_6.png', 'Same', '0', '1', 18, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087393_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087393_6.png', 'Same', '0', '1', 2, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087461_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087561_6.png', 'Different', '0', '1', 66, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/031763.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/071197.jpg', 'ground_truth', '0', '1', 95, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087436_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087436_5.png', 'Same', '1', '0', 43, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/162863.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/163099.jpg', 'ground_truth', '0', '1', 119, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087815.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/059187.jpg', 'ground_truth', '0', '1', 109, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087411_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087411_5.png', 'Same', '1', '0', 19, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087425_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087425_5.png', 'Same', '1', '0', 33, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087430_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087430_5.png', 'Same', '1', '0', 38, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/058718.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/117153.jpg', 'ground_truth', '1', '0', 104, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087558_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087458_5.png', 'Different', '1', '0', 63, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087414_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087414_6.png', 'Same', '0', '1', 22, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087397_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087397_6.png', 'Same', '0', '1', 5, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087413_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087413_5.png', 'Same', '1', '0', 21, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087429_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087429_5.png', 'Same', '1', '0', 37, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087406_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087406_5.png', 'Same', '1', '0', 14, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/012903.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/142159.jpg', 'ground_truth', '0', '1', 126, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087446_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087546_6.png', 'Different', '0', '1', 52, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/170885.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/028623.jpg', 'ground_truth', '1', '0', 125, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/100309.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/003364.jpg', 'ground_truth', '0', '1', 121, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/197015.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/063035.jpg', 'ground_truth', '0', '1', 123, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/037231.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/048954.jpg', 'ground_truth', '0', '1', 107, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087408_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087408_6.png', 'Same', '0', '1', 16, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087464_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087529_6.png', 'Different', '0', '1', 69, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/029877.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/166013.jpg', 'ground_truth', '0', '1', 129, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087550_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087450_5.png', 'Different', '1', '0', 56, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/076050.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/089093.jpg', 'ground_truth', '0', '1', 108, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087470_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087570_6.png', 'Different', '0', '1', 74, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/116420.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/128593.jpg', 'ground_truth', '1', '0', 106, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087437_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087437_6.png', 'Same', '0', '1', 44, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/038546.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087124.jpg', 'ground_truth', '1', '0', 94, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087391_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087391_6.png', 'Same', '0', '1', 0, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087556_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087456_5.png', 'Different', '1', '0', 62, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087442_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087542_6.png', 'Different', '0', '1', 48, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087396_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087396_5.png', 'Same', '1', '0', 4, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087483_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087582_6.png', 'Different', '0', '1', 86, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087453_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087553_6.png', 'Different', '0', '1', 59, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087405_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087405_5.png', 'Same', '1', '0', 13, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087571_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087471_5.png', 'Different', '1', '0', 75, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/193776.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/183144.jpg', 'ground_truth', '0', '1', 101, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087459_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087559_6.png', 'Different', '0', '1', 64, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087426_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087426_5.png', 'Same', '1', '0', 34, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/017814.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/183037.jpg', 'ground_truth', '0', '1', 102, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/076493.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/101907.jpg', 'ground_truth', '1', '0', 92, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087400_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087400_6.png', 'Same', '0', '1', 8, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087552_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087452_5.png', 'Different', '1', '0', 58, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/029805.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/142336.jpg', 'ground_truth', '0', '1', 96, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087439_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087543_6.png', 'Different', '0', '1', 49, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087468_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087465_5.png', 'Different', '1', '0', 70, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087549_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087449_5.png', 'Different', '1', '0', 55, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087474_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087574_6.png', 'Different', '0', '1', 78, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087551_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087451_5.png', 'Different', '1', '0', 57, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087466_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087566_6.png', 'Different', '0', '1', 71, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087407_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087407_6.png', 'Same', '0', '1', 15, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087418_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087418_5.png', 'Same', '1', '0', 26, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087447_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087547_6.png', 'Different', '0', '1', 53, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087421_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087421_6.png', 'Same', '0', '1', 29, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087398_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087398_6.png', 'Same', '0', '1', 6, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087445_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087545_6.png', 'Different', '0', '1', 51, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/176723.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/106414.jpg', 'ground_truth', '1', '0', 118, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087403_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087403_6.png', 'Same', '0', '1', 11, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087563_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087463_5.png', 'Different', '1', '0', 68, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087397_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087397_6.png', 'Same', '0', '1', 5, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087438_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087538_6.png', 'Different', '0', '1', 45, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087427_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087427_6.png', 'Same', '0', '1', 35, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/109934.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/167881.jpg', 'ground_truth', '1', '0', 100, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/083021.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/153416.jpg', 'ground_truth', '1', '0', 124, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/101536.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/137367.jpg', 'ground_truth', '1', '0', 122, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087462_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087562_6.png', 'Different', '0', '1', 67, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/049014.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/012584.jpg', 'ground_truth', '0', '1', 128, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087477_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087577_6.png', 'Different', '0', '1', 81, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087486_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087534_6.png', 'Different', '0', '1', 89, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/085089.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/027389.jpg', 'ground_truth', '1', '0', 117, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/030129.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/078610.jpg', 'ground_truth', '1', '0', 113, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087419_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087419_6.png', 'Same', '0', '1', 27, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087473_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087573_6.png', 'Different', '0', '1', 77, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087540_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087480_5.png', 'Different', '1', '0', 84, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087568_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087476_5.png', 'Different', '1', '0', 80, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087444_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087544_6.png', 'Different', '0', '1', 50, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087572_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087472_5.png', 'Different', '1', '0', 76, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087425_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087425_6.png', 'Same', '0', '1', 33, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087578_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087478_5.png', 'Different', '1', '0', 82, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087416_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087416_5.png', 'Same', '1', '0', 24, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/083782.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/145078.jpg', 'ground_truth', '0', '1', 105, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087434_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087434_6.png', 'Same', '0', '1', 42, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087392_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087392_6.png', 'Same', '0', '1', 1, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087432_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087432_5.png', 'Same', '1', '0', 40, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087404_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087404_6.png', 'Same', '0', '1', 12, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/059649.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/174166.jpg', 'ground_truth', '1', '0', 116, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087428_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087428_5.png', 'Same', '1', '0', 36, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087394_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087394_6.png', 'Same', '0', '1', 3, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/129957.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/034125.jpg', 'ground_truth', '0', '1', 114, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087585_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087485_5.png', 'Different', '1', '0', 88, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087454_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087554_6.png', 'Different', '0', '1', 60, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087567_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087467_5.png', 'Different', '1', '0', 72, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087401_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087401_6.png', 'Same', '0', '1', 9, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/026100.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/130100.jpg', 'ground_truth', '1', '0', 111, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087422_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087422_6.png', 'Same', '0', '1', 30, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/066743.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/127601.jpg', 'ground_truth', '0', '1', 93, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087392_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087392_5.png', 'Same', '1', '0', 1, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/023754.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/164888.jpg', 'ground_truth', '1', '0', 120, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087415_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087415_5.png', 'Same', '1', '0', 23, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087399_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087399_6.png', 'Same', '0', '1', 7, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087579_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087479_5.png', 'Different', '1', '0', 83, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087442_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087542_6.png', 'Different', '0', '1', 48, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/095605.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/144125.jpg', 'ground_truth', '0', '1', 98, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087433_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087433_5.png', 'Same', '1', '0', 41, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087412_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087412_5.png', 'Same', '1', '0', 20, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/113079.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/086142.jpg', 'ground_truth', '1', '0', 90, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/046077.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/065232.jpg', 'ground_truth', '0', '1', 91, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087409_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087409_5.png', 'Same', '1', '0', 17, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/045672.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/032883.jpg', 'ground_truth', '0', '1', 112, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087413_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087413_5.png', 'Same', '1', '0', 21, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087415_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087415_6.png', 'Same', '0', '1', 23, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/063159.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/028757.jpg', 'ground_truth', '0', '1', 97, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/032084.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/122913.jpg', 'ground_truth', '0', '1', 99, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087581_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087481_5.png', 'Different', '1', '0', 85, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/110369.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/042063.jpg', 'ground_truth', '1', '0', 103, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087580_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087440_5.png', 'Different', '1', '0', 46, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087450_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087550_6.png', 'Different', '0', '1', 56, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087448_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087557_6.png', 'Different', '0', '1', 54, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087575_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087475_5.png', 'Different', '1', '0', 79, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087469_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087569_6.png', 'Different', '0', '1', 73, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087560_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087460_5.png', 'Different', '1', '0', 65, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087584_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087484_5.png', 'Different', '1', '0', 87, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087541_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087441_5.png', 'Different', '1', '0', 47, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087420_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087420_5.png', 'Same', '1', '0', 28, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087402_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087402_5.png', 'Same', '1', '0', 10, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087455_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087555_6.png', 'Different', '0', '1', 61, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/094797.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/016460.jpg', 'ground_truth', '0', '1', 110, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/046799.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/154412.jpg', 'ground_truth', '0', '1', 115, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087423_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087423_6.png', 'Same', '0', '1', 31, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087486_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087534_6.png', 'Different', '0', '1', 89, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087431_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087431_6.png', 'Same', '0', '1', 39, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087557_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087448_5.png', 'Different', '1', '0', 54, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087571_6.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087471_5.png', 'Different', '1', '0', 75, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087424_5.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/087424_6.png', 'Same', '0', '1', 32, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/065719.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_aggressive/094816.jpg', 'ground_truth', '0', '1', 127, 0],];
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