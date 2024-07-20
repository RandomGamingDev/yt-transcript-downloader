class Section {
	constructor(name, lines = []) {
		this.name = name;
		this.lines = lines;
	}
}
class Transcript {
	constructor(title = document.title, url = window.location.href, sections = [new Section("")]) {
		this.title = title;
		this.url = url;
		this.sections = sections;
	}

	append_section(section_name) {
		this.sections.push(new Section(section_name));
	}

	append_line(time, line) {
		this.sections[this.sections.length - 1].lines.push({ [time]: line });
	}

	save() {
		if (this.sections.length > 1)
			this.sections.shift();

		const stringified_transcript = JSON.stringify(this, null, 2);
		const blob_transcript = new Blob([stringified_transcript], { type: 'application/json' });
		const transcript_url = URL.createObjectURL(blob_transcript);
		const a = document.createElement('a');
		a.href = transcript_url;
		a.download = `${ this.title } Transcript.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(transcript_url);
	}
}
const transcript = new Transcript();

new MutationObserver(function(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.target.getAttribute("target-id") != "engagement-panel-searchable-transcript")
			continue

		const transcript_window = document.querySelector("ytd-engagement-panel-section-list-renderer[target-id=\"engagement-panel-searchable-transcript\"]");
		const transcript_header = transcript_window.querySelector("div#header").querySelector("div#header");
		const transcript_header_menu_option = transcript_header.querySelector("div#menu");

		const transcript_header_download_option = transcript_header_menu_option.cloneNode(true);
		transcript_header_download_option.id = "download";
		const transcript_header_download_icon = transcript_header_download_option.querySelector("yt-icon");
		transcript_header.insertBefore(transcript_header_download_option, transcript_header_menu_option);
		transcript_header_download_icon.insertAdjacentHTML("beforeend", `
			<div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
			</div>
		`);
		const transcript_header_download_button = transcript_header_download_option.querySelector("button#button");
		transcript_header_download_button.addEventListener("click", () => {
			const transcript_content = transcript_window.querySelector("div#segments-container");
			const transcript_txt = transcript_content.textContent;

			let cursor = 0;
			const to_nonwhitespace = () => {
				for (; cursor < transcript_txt.length; cursor++) {
					const char = transcript_txt[cursor];
					if (char != ' ' && char != '\n')
						return;
				}
			};

			while (cursor < transcript_txt.length - 1) {
				to_nonwhitespace();
				const time_str_end = transcript_txt.indexOf('\n', cursor);
				if (time_str_end == -1)
					break;
				const time = transcript_txt.substring(cursor, time_str_end);
				cursor = time_str_end + 1;
				if (time.indexOf(':') == -1) {
					transcript.append_section(time);
					continue;
				}

				to_nonwhitespace();
				const line_str_end = transcript_txt.indexOf('\n', cursor);
				const line = transcript_txt.substring(cursor, line_str_end);
				cursor = line_str_end + 1;

				transcript.append_line(time, line);
			}

			transcript.save();
		}); 

		observer.disconnect();
	}
}).observe(document.body, {childList: true, subtree: true });