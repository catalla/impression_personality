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

		var stims = [['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087417_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087417_4.png', 'Same', '0', '1', 25, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087410_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087410_4.png', 'Same', '0', '1', 18, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087393_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087393_4.png', 'Same', '0', '1', 2, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087461_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087561_4.png', 'Different', '0', '1', 66, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/059649.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/069891.jpg', 'ground_truth', '0', '1', 95, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087436_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087436_3.png', 'Same', '1', '0', 43, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/016460.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/139565.jpg', 'ground_truth', '0', '1', 119, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/046154.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/202381.jpg', 'ground_truth', '0', '1', 109, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087411_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087411_3.png', 'Same', '1', '0', 19, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087425_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087425_3.png', 'Same', '1', '0', 33, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087430_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087430_3.png', 'Same', '1', '0', 38, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/154490.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/161851.jpg', 'ground_truth', '1', '0', 104, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087558_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087458_3.png', 'Different', '1', '0', 63, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087414_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087414_4.png', 'Same', '0', '1', 22, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087397_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087397_4.png', 'Same', '0', '1', 5, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087413_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087413_3.png', 'Same', '1', '0', 21, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087429_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087429_3.png', 'Same', '1', '0', 37, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087406_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087406_3.png', 'Same', '1', '0', 14, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/060715.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/199360.jpg', 'ground_truth', '0', '1', 126, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087446_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087546_4.png', 'Different', '0', '1', 52, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/014491.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/064273.jpg', 'ground_truth', '1', '0', 125, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/048954.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/081442.jpg', 'ground_truth', '0', '1', 121, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/088131.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/141442.jpg', 'ground_truth', '0', '1', 123, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/183108.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/044820.jpg', 'ground_truth', '0', '1', 107, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087408_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087408_4.png', 'Same', '0', '1', 16, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087464_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087529_4.png', 'Different', '0', '1', 69, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/003364.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/152095.jpg', 'ground_truth', '0', '1', 129, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087550_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087450_3.png', 'Different', '1', '0', 56, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/058718.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/153416.jpg', 'ground_truth', '0', '1', 108, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087470_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087570_4.png', 'Different', '0', '1', 74, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/017578.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/004432.jpg', 'ground_truth', '1', '0', 106, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087437_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087437_4.png', 'Same', '0', '1', 44, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/017814.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/163099.jpg', 'ground_truth', '1', '0', 94, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087391_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087391_4.png', 'Same', '0', '1', 0, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087556_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087456_3.png', 'Different', '1', '0', 62, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087442_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087542_4.png', 'Different', '0', '1', 48, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087396_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087396_3.png', 'Same', '1', '0', 4, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087483_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087582_4.png', 'Different', '0', '1', 86, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087453_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087553_4.png', 'Different', '0', '1', 59, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087405_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087405_3.png', 'Same', '1', '0', 13, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087571_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087471_3.png', 'Different', '1', '0', 75, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/111691.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/014575.jpg', 'ground_truth', '0', '1', 101, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087459_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087559_4.png', 'Different', '0', '1', 64, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087426_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087426_3.png', 'Same', '1', '0', 34, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/063035.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/051703.jpg', 'ground_truth', '0', '1', 102, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/128593.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/038546.jpg', 'ground_truth', '1', '0', 92, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087400_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087400_4.png', 'Same', '0', '1', 8, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087552_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087452_3.png', 'Different', '1', '0', 58, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/101536.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/042063.jpg', 'ground_truth', '0', '1', 96, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087439_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087543_4.png', 'Different', '0', '1', 49, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087468_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087465_3.png', 'Different', '1', '0', 70, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087549_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087449_3.png', 'Different', '1', '0', 55, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087474_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087574_4.png', 'Different', '0', '1', 78, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087551_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087451_3.png', 'Different', '1', '0', 57, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087466_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087566_4.png', 'Different', '0', '1', 71, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087407_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087407_4.png', 'Same', '0', '1', 15, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087418_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087418_3.png', 'Same', '1', '0', 26, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087447_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087547_4.png', 'Different', '0', '1', 53, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087421_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087421_4.png', 'Same', '0', '1', 29, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087398_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087398_4.png', 'Same', '0', '1', 6, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087445_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087545_4.png', 'Different', '0', '1', 51, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/066620.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/098852.jpg', 'ground_truth', '1', '0', 118, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087403_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087403_4.png', 'Same', '0', '1', 11, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087563_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087463_3.png', 'Different', '1', '0', 68, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087397_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087397_4.png', 'Same', '0', '1', 5, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087438_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087538_4.png', 'Different', '0', '1', 45, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087427_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087427_4.png', 'Same', '0', '1', 35, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/066743.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/075690.jpg', 'ground_truth', '1', '0', 100, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/161106.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/129041.jpg', 'ground_truth', '1', '0', 124, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/163401.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/132670.jpg', 'ground_truth', '1', '0', 122, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087462_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087562_4.png', 'Different', '0', '1', 67, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/037932.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/154547.jpg', 'ground_truth', '0', '1', 128, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087477_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087577_4.png', 'Different', '0', '1', 81, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087486_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087534_4.png', 'Different', '0', '1', 89, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/110505.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/071197.jpg', 'ground_truth', '1', '0', 117, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/086142.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/083021.jpg', 'ground_truth', '1', '0', 113, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087419_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087419_4.png', 'Same', '0', '1', 27, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087473_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087573_4.png', 'Different', '0', '1', 77, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087540_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087480_3.png', 'Different', '1', '0', 84, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087568_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087476_3.png', 'Different', '1', '0', 80, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087444_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087544_4.png', 'Different', '0', '1', 50, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087572_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087472_3.png', 'Different', '1', '0', 76, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087425_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087425_4.png', 'Same', '0', '1', 33, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087578_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087478_3.png', 'Different', '1', '0', 82, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087416_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087416_3.png', 'Same', '1', '0', 24, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/021977.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/185720.jpg', 'ground_truth', '0', '1', 105, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087434_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087434_4.png', 'Same', '0', '1', 42, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087392_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087392_4.png', 'Same', '0', '1', 1, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087432_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087432_3.png', 'Same', '1', '0', 40, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087404_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087404_4.png', 'Same', '0', '1', 12, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/015355.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/144125.jpg', 'ground_truth', '1', '0', 116, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087428_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087428_3.png', 'Same', '1', '0', 36, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087394_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087394_4.png', 'Same', '0', '1', 3, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/023754.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/186784.jpg', 'ground_truth', '0', '1', 114, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087585_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087485_3.png', 'Different', '1', '0', 88, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087454_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087554_4.png', 'Different', '0', '1', 60, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087567_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087467_3.png', 'Different', '1', '0', 72, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087401_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087401_4.png', 'Same', '0', '1', 9, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/025424.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/011602.jpg', 'ground_truth', '1', '0', 111, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087422_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087422_4.png', 'Same', '0', '1', 30, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/028757.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/063159.jpg', 'ground_truth', '0', '1', 93, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087392_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087392_3.png', 'Same', '1', '0', 1, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/148578.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/032883.jpg', 'ground_truth', '1', '0', 120, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087415_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087415_3.png', 'Same', '1', '0', 23, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087399_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087399_4.png', 'Same', '0', '1', 7, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087579_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087479_3.png', 'Different', '1', '0', 83, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087442_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087542_4.png', 'Different', '0', '1', 48, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/183037.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/105842.jpg', 'ground_truth', '0', '1', 98, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087433_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087433_3.png', 'Same', '1', '0', 41, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087412_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087412_3.png', 'Same', '1', '0', 20, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/051409.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/109934.jpg', 'ground_truth', '1', '0', 90, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/065232.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/046077.jpg', 'ground_truth', '0', '1', 91, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087409_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087409_3.png', 'Same', '1', '0', 17, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/127601.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/031763.jpg', 'ground_truth', '0', '1', 112, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087413_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087413_3.png', 'Same', '1', '0', 21, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087415_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087415_4.png', 'Same', '0', '1', 23, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/142336.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/150350.jpg', 'ground_truth', '0', '1', 97, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/012584.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/058879.jpg', 'ground_truth', '0', '1', 99, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087581_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087481_3.png', 'Different', '1', '0', 85, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/173647.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/094816.jpg', 'ground_truth', '1', '0', 103, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087580_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087440_3.png', 'Different', '1', '0', 46, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087450_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087550_4.png', 'Different', '0', '1', 56, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087448_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087557_4.png', 'Different', '0', '1', 54, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087575_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087475_3.png', 'Different', '1', '0', 79, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087469_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087569_4.png', 'Different', '0', '1', 73, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087560_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087460_3.png', 'Different', '1', '0', 65, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087584_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087484_3.png', 'Different', '1', '0', 87, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087541_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087441_3.png', 'Different', '1', '0', 47, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087420_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087420_3.png', 'Same', '1', '0', 28, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087402_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087402_3.png', 'Same', '1', '0', 10, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087455_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087555_4.png', 'Different', '0', '1', 61, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/154412.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/174166.jpg', 'ground_truth', '0', '1', 110, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/076493.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/032084.jpg', 'ground_truth', '0', '1', 115, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087423_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087423_4.png', 'Same', '0', '1', 31, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087486_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087534_4.png', 'Different', '0', '1', 89, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087431_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087431_4.png', 'Same', '0', '1', 39, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087557_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087448_3.png', 'Different', '1', '0', 54, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087571_4.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087471_3.png', 'Different', '1', '0', 75, 1],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087424_3.png', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/087424_4.png', 'Same', '0', '1', 32, 0],
['https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/042807.jpg', 'https://raw.githubusercontent.com/amandasongmm/impression_personality/master/static/amt_stargan_trustworthy/193766.jpg', 'ground_truth', '0', '1', 127, 0],];

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