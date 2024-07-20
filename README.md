# Youtube Transcript Downloader aka yt-transcript-downloader
### A Firefox Extension that allows you to download the Transcripts of Youtube Videos as JSONs. Perfect for all your Youtube Historian and Research needs!
![image](https://github.com/user-attachments/assets/0fd2cde4-313e-479d-a492-4a4b299fc90d)

## Results
### After hitting the vanilla `Show transcript` button
![image](https://github.com/user-attachments/assets/96afa76c-042e-4678-a2b9-cf564a229392)
### You now get a new download button that you can click on to download the transcript as a JSON
![image](https://github.com/user-attachments/assets/05e691d7-f1b1-4767-b26b-a50e4dfaf22f)
### The format of the JSON is just
#### { "title": `<title>`, "url": `<url>`, "sections": [{ "name": <name>, "lines": [{ `<time>`: `<line>` }, `...`] }, `...`] }
![image](https://github.com/user-attachments/assets/107f8dde-1d91-4fed-bc4b-1529f8ced1ec)


## How it works
It takes the transcript tab, converts it to text, and the does some custom parsing in order to turn it into a JSON file containing all metadata from the transcript that could be needed.
