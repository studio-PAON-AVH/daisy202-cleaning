# daisy202-cleaning
Cleaning scripts of AVH Daisy2.02 production for other organisms.

This repository holds some of the cleaning script realised in the 
transcription service of Association Valentin Hauy (namely the "Pole 
d'Adaptation des Ouvrages Numériques", or PAON) to optimize of fix some
of the older books produced by AVH.

Those scripts (and most of those made within the service) are done in
javascript.

Note that we use the runtime bun.js internally.

## Scripts

We will put here the scripts made available to the public through time.

- `remove_duplicate_ncc_pagelinks.js` : within a ncc.html file,  this script
  remove `span`s that have links that duplicated a heading's link.
  - usage example : `bun run remove_duplicate_ncc_pagelinks.js path/to/ncc.html`
  - Beware that the script is "in place" : it will replace the targeted
    ncc.html file.