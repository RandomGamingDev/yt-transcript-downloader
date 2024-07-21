# Youtube Transcript Downloader aka yt-transcript-downloader
### A Firefox Extension that allows you to download the Transcripts of Youtube Videos as JSONs. Perfect for all your Youtube Historian and Research needs!
You can use it here: https://addons.mozilla.org/en-US/firefox/addon/youtube-transcript-downloader/

![image](https://github.com/user-attachments/assets/0fd2cde4-313e-479d-a492-4a4b299fc90d)

## Results
### After hitting the vanilla `Show transcript` button
![image](https://github.com/user-attachments/assets/96afa76c-042e-4678-a2b9-cf564a229392)
### You now get a new download button that you can click on to download the transcript as a JSON
![image](https://github.com/user-attachments/assets/05e691d7-f1b1-4767-b26b-a50e4dfaf22f)
![image](https://github.com/user-attachments/assets/107f8dde-1d91-4fed-bc4b-1529f8ced1ec)
### The format of the JSON is the following:
#### { "title": `<title>`, "url": `<url>`, "sections": [{ "name": <name>, "lines": [{ `<time>`: `<line>` }, `...`] }, `...`] }
#### Youtube videos without sections just have one section with a blank name

## How it works
It takes the transcript tab, converts it to text, and the does some custom parsing in order to turn it into a JSON file containing all metadata from the transcript that could be needed.
