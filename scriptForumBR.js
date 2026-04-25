// ==UserScript==
// @name         Script for Forum Black Russia
// @namespace    http://tampermonkey.net/
// @version      2026-04-24
// @description  Quick response script for the Black Russia mobile game forum
// @author       Vladyslav Tkach
// @match        https://forum.blackrussia.online/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

;(function () {
	'use strict'

	const startMainScript = dataArray => {}

	let isDomReady = false
	let isDataReady = false
	let loadedData = null

	const checkAndRun = () => {
		if (isDomReady && isDataReady) startMainScript(loadedData)
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', () => {
			isDomReady = true
			checkAndRun()
		})
	} else {
		isDomReady = true
		checkAndRun()
	}

	const DATA_URL =
		'https://raw.githubusercontent.com/vladtkach2006/dataForScriptForumBR/main/date.json'

	GM_xmlhttpRequest({
		method: 'GET',
		url: DATA_URL,
		onload: response => {
			if (response.status === 200) {
				try {
					loadedData = JSON.parse(response.responseText)
					isDataReady = true
					checkAndRun()
					console.log(loadedData)
				} catch (error) {
					console.error('Ошибка парсинга JSON', error)
				}
			} else {
				console.error('Ошибка загрузки файла', response.status)
			}
		}
	})
})()
