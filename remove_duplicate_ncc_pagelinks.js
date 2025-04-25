
/**
 * @author		Nicolas Pavie <n.pavie@avh.asso.fr>
 * @license		MIT
 * @description	This script removes spans that contains links duplicating
 * 				headings links in a ncc.html file provided as first argument.
 */
import fs from 'fs';
import process from 'process';
import { JSDOM } from 'jsdom';

let errorCode = 1;
if (process.argv.length < 3) {
	console.error('Usage: node remove_duplicate_ncc_pagelinks.js <ncc.html>');
	process.exit(errorCode);
}

if (process.argv[2] === '--help') {
	console.log('Usage: node remove_duplicate_ncc_pagelinks.js <ncc.html>');
	console.log('This script removes duplicate pagelinks from the specified ncc.html file.');
	process.exit(0);
}


errorCode++;
if (!process.argv[2].toLocaleLowerCase().endsWith('ncc.html')) {
	console.error('Error: The input file must be an ncc.html file.');
	process.exit(2);
}


errorCode++;
if(!fs.existsSync(process.argv[2])) {
	console.error('Error: The specified file does not exist.');
	process.exit(3);
}

const inputFilePath = process.argv[2];

// Function to load an ncc.html file into a DOM element
function loadNccFile(filePath) {
	try {
		console.log(`Loading file: ${filePath}`);
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		const dom = new JSDOM(fileContent);
		return dom.window.document;
	} catch (error) {
		console.error('Error loading the file:', error);
		return null;
	}
}

const document = loadNccFile(inputFilePath);

errorCode++;
if (document) {
	// get all h1 h2 h3 h4 h5 h6 elements
	const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
	let headingsLinks = []
	console.log(`Found ${headings.length} headings.`);
	for(const heading of headings) {
		const headingLink = heading.querySelector('a');
		if(headingLink) {
			headingsLinks.push(headingLink.getAttribute('href'));
		}
	}
	console.log('Checking for duplicate links in spans...');
	const spans = document.querySelectorAll('span');
	for(const span of spans) {
		const spanlink = span.querySelector('a');
		if(spanlink) {
			const spanlinkHref = spanlink.getAttribute('href');
			if(headingsLinks.includes(spanlinkHref)) {
				span.remove();
				console.log(`Removed span with duplicate link: ${spanlinkHref}`);
			}
		}
	}
	console.log('Done, updating the ncc file...');
	errorCode++;
	try{
		fs.writeFileSync(inputFilePath, document.documentElement.outerHTML, 'utf-8');
	} catch (error) {
		console.error('Error writing the file:', error);
		process.exit(errorCode);
	}
	
} else {
	console.error('Failed to load the document.');
	process.exit(errorCode);
}