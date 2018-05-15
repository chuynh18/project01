"use strict";

var placesResponse;
var clickedPark;
var geocodeResponse;
var latitude;
var longitude;
var weatherObservation;
var weatherForecast;
var trails;
var recentSearch = [];

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDCG4DjukKJW_yQ-nGvC1UnF2Q8f6hzP_w",
    authDomain: "not-used-for-hw.firebaseapp.com",
    databaseURL: "https://not-used-for-hw.firebaseio.com",
    projectId: "not-used-for-hw",
    storageBucket: "not-used-for-hw.appspot.com",
    messagingSenderId: "532977520995"
};

firebase.initializeApp(config);
var dataRef = firebase.database();

// retrieve last four searches from Firebase and append them to the top of the page
dataRef.ref().orderByChild("dateAdded").limitToLast(4).on("child_added", function(snapshot) {
	console.log(snapshot.val());
	var searchedName = snapshot.val().name;
	var searchedLat = snapshot.val().lat;
	var searchedLng = snapshot.val().lng;

	recentSearch.push(searchedName);

	var searchedSpan = $("<span>");
	searchedSpan.addClass("nav-item nav-link oswald recentSearches");
	searchedSpan.attr("data-lat", searchedLat);
	searchedSpan.attr("data-lng", searchedLng);
	searchedSpan.attr("data-name", searchedName);
	searchedSpan.text(searchedName);

	$(".navbar-nav").append(searchedSpan);

	// if there are more than 4 recent searches, remove the oldest one
	var numRecentSearches = document.getElementsByClassName("recentSearches");
	if (numRecentSearches.length > 4) {
		numRecentSearches[0].parentNode.removeChild(numRecentSearches[0]);
	};
});

var campground = {
	"html_attributions": [],
	"results": [
		{
			"formatted_address": "Death Valley, CA 98801, USA",
			"geometry": {
				"location": {
					"lat": 36.2657861,
					"lng": -117.1881833
				},
				"viewport": {
					"northeast": {
						"lat": 36.26713592989272,
						"lng": -117.1868334701073
					},
					"southwest": {
						"lat": 36.26443627010728,
						"lng": -117.1895331298927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "15cf1e7711259e20285d4ab64d19bf5999b822cb",
			"name": "Wildrose Campground",
			"photos": [
				{
					"height": 2988,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/117276505865358848117/photos\">Paul Alms</a>"
					],
					"photo_reference": "CmRaAAAAV9MNcVyr1sXn4Pd43gIv9iK5AlsjKfWnmPT95CIzGjkwNkDjSxd1gpTm535WAjZWY-Wd-4D14dAp3m7Quzk4l3m79nuPVupTstevoglV-YUNNqGDOT3y08sJ_1QXZttZEhB4u85nwt3rQMoqUn9FL5jmGhSguGUgzG_CnwpD7wwokBy0X980vA",
					"width": 5312
				}
			],
			"place_id": "ChIJbevv_TrNwIAR3YaHS_uGP2k",
			"rating": 4.7,
			"reference": "CmRbAAAAWFyMXby1iK9xAI1xTIQaK1bwpp-s_jEcum2n3Oc7n0R-RUJKmwo21Paf370SmGrYdtAMJY2l1GtesHFwpBoEf8vnAOemnHQFntzpSiHluDTheSwxzXhV6un1cmqRUEiwEhBoXr7Kw6yBpUO6gXWqrsOfGhQkJUn33w5v2KddWGRkqupci8N34w",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "DEATH VALLEY, CA 92328, USA",
			"geometry": {
				"location": {
					"lat": 36.23002779999999,
					"lng": -117.0683417
				},
				"viewport": {
					"northeast": {
						"lat": 36.23137762989271,
						"lng": -117.0669918701073
					},
					"southwest": {
						"lat": 36.22867797010727,
						"lng": -117.0696915298928
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "00e91f9f006a2611aa4d359664ed0a1ccdd9be69",
			"name": "Mahogany Flat Campground",
			"photos": [
				{
					"height": 3024,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/104521799355432602525/photos\">A Google User</a>"
					],
					"photo_reference": "CmRaAAAAjIRvRCyMvFmKsEnU_5G2RnuaAONAuWRori75iLuisrHogrpqEpQPheU5BiUGEuvna9oTkF1lAPFTOiEX8tD8mcGe5hXILXhYY42Z1pUh693sHWL-hsOJlQ44l-H0_Ey7EhAKZZyFPcOJ18q_wd00TTogGhT2Q2bfW4VMb3cHKuVzeJr9Mt3CdQ",
					"width": 4032
				}
			],
			"place_id": "ChIJ4asy0Hwux4ARwzK9y0Kfua4",
			"rating": 4.7,
			"reference": "CmRbAAAAC_2odwLK6JPv0SynnNZIurAx4oNDkJECFWy9OEyZZa6TTKrCG74avIFAxIn1Z3d5gVOzYeiMU032O_8ORbArt5NTOi_ozUuaGqTnHROpdMn8hrJErLsYTauoISo3w4dhEhAJc8kxaAK8XfiH7jHAXo6IGhRH-E5yVjG7B4047XdRZTQXRc8Miw",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "DEATH VALLEY, CA 92328, USA",
			"geometry": {
				"location": {
					"lat": 36.4588451,
					"lng": -116.863718
				},
				"viewport": {
					"northeast": {
						"lat": 36.4604344,
						"lng": -116.8579502
					},
					"southwest": {
						"lat": 36.45407719999999,
						"lng": -116.8656406
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "a5fd9c665e0296366d329b9ded238bc86a48fb13",
			"name": "Sunset Campground",
			"photos": [
				{
					"height": 2304,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/110990900889544646204/photos\">J.Vamsi Krishna</a>"
					],
					"photo_reference": "CmRaAAAAUh-s2DzbBLCy-RCwbayOxRI_CpiCQ6Gp3dSPOiU1sQLTI4QnyUUwfIOfRQ5hA4hWhJkjYpPxl4kRr0-W0QWS7PlgMaZYwo3N1EYMYEb016NXAXL8GVmYfYxjbnCHoaeGEhAzQS68_6GoghOaIDtRWH3UGhSvrpYElhAzFiSc1L-CVxVgJSRFLg",
					"width": 4096
				}
			],
			"place_id": "ChIJUwuvvms_x4ARm2cMW5AymKk",
			"rating": 3.7,
			"reference": "CmRbAAAASdmwiEHNTqE0umvcL3Xs85xClM09Wy4fBay7iZpeLcAjzPYPTLlw9xNuTMKbjSkaEOqk6R92CghyReIonEbvoqiAF1vubvrUdxkFuJB0uvsG7Ue3Q3feIuBE2R-cL-7uEhA_tORApAsD9hqw0cUIm_1gGhTR16EmY6P14iXb5oX9uXstkT_4tw",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "DEATH VALLEY, CA 92328, USA",
			"geometry": {
				"location": {
					"lat": 36.9627667,
					"lng": -117.3677389
				},
				"viewport": {
					"northeast": {
						"lat": 36.96447247989271,
						"lng": -117.3663610201073
					},
					"southwest": {
						"lat": 36.96177282010727,
						"lng": -117.3690606798927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "9ae28a8894d62bed329213a31ebe2736fb069b25",
			"name": "Mesquite Spring Campground",
			"photos": [
				{
					"height": 2448,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/113368998867577115677/photos\">Sal G.</a>"
					],
					"photo_reference": "CmRaAAAAdS6DbAabrIpAg5NmAHV8Gia2A2sNQeQz3LARebLPiexOGrA0sbp_YSNQi__Svig79guDsKJaWE0rnm6Owa7GeeLdgDzKj9-z5-jfZKYyNjbnnJFQLPJXq3tNutou2jopEhDKCTjFbQIhtDC4izEO3UjeGhToA5i-CaMlpWEBSMD3IXkvcKh3wQ",
					"width": 3264
				}
			],
			"place_id": "ChIJbcLF5NlHv4ARsRzpVAvpyvI",
			"rating": 4.7,
			"reference": "CmRbAAAAGZNWrDQyu4S4xddyXwD7htliRtYmaxeONvSUG3mTPT_eDBhbTT0WGPcTwvMWCEL3B9Rh3J_mKQFjRNZXhGe95KtduhfAkwtSovqK8TI4he7YN3H-K51an_TQfk5immCGEhDIjAjlBdH0gNGxdgPAehDEGhTmfhM6AqvSrhTfj9GWTULRAKSaZA",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "Texas Springs Rd, Furnace Creek, CA 92328, USA",
			"geometry": {
				"location": {
					"lat": 36.4593462,
					"lng": -116.8555261
				},
				"viewport": {
					"northeast": {
						"lat": 36.46069602989272,
						"lng": -116.8541762701073
					},
					"southwest": {
						"lat": 36.45799637010728,
						"lng": -116.8568759298927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "47ed461372415eb1c64f7c9ae4af25f7c68f5dcc",
			"name": "Texas Spring Campground",
			"photos": [
				{
					"height": 3024,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/101740586190168454192/photos\">Brian Holle</a>"
					],
					"photo_reference": "CmRaAAAA5HTZsKerNTlVnCV2oHJ-KoFD3WIGYCBrijLuT-ugwTkKujFCNS2Rm9t04q4Brdp7QGF5lgaRwzKH_CYiCKWUdcNe2J79dnLmdLISpaozHUi6nkZxvj3Khl7X7SOhXNvuEhCfeKm8mbEySk0tDULZOfDkGhSID3lTGUqEDJLwwXjBFfJP_D534g",
					"width": 4032
				}
			],
			"place_id": "ChIJvU6U2ww_x4AR08hXaewDLMg",
			"rating": 4.3,
			"reference": "CmRbAAAAyrf8ny1G_hkh6I6VNRtEBAPT-WoZk3OW27NS7rTklv5io05wvdSwhGVyd3EixNQdoDBKpt-idTXvS1Jvjxi2rKKBn8v-wtym2FDj89s7Uyuq-QheaM6VS6_nk1cOv239EhB-U3K8fX9mXC0xnrPWqcjMGhQSzPSQ0R5X9Q8Y-LGDpcIWk9DC9Q",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "DEATH VALLEY, CA 92328, USA",
			"geometry": {
				"location": {
					"lat": 36.4631837,
					"lng": -116.8688786
				},
				"viewport": {
					"northeast": {
						"lat": 36.46453352989273,
						"lng": -116.8675287701073
					},
					"southwest": {
						"lat": 36.46183387010728,
						"lng": -116.8702284298927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "278b8715d2e1e13d0d11ae134017a4d2226612a2",
			"name": "Furnace Creek Campground",
			"photos": [
				{
					"height": 2448,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/107018650961774970447/photos\">Mithun Khatri</a>"
					],
					"photo_reference": "CmRaAAAAVHgGd0BzoVgD-KoZv1quZ12juIGZi4tBi_wwLj3yaeqMnGCc6x0_cpD0-_1L7rXo7y1X4_FNegv6D0xnTVd48MdDT2fq4WKgS-ewnhGhu-R9amnbiDELD2KlBy8zZMYmEhARxbYX1e_XObJZathC3LReGhQWeazkMyd0m7-gsGuw5Q47oF111w",
					"width": 3264
				}
			],
			"place_id": "ChIJMRc9aUI_x4ARJIB6raPhMxM",
			"rating": 4.5,
			"reference": "CmRbAAAAIuuW9iisIra6CwSTjBBh-05QuuzputLmpMyn--sdmMatikUZhAWAQ26k8lPKoerjCPCkI2iFLQqDb-8BNNXewq-mQo4SbZQG0yexDnZg2VNn0bWqp6Vjtcx5awNL1LbOEhC15PzGASddSldtApQRuol1GhQ94UtBS-fW42jDMie7PHIxeNfz0Q",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "CA-190, California 92328, USA",
			"geometry": {
				"location": {
					"lat": 36.4965583,
					"lng": -117.2276833
				},
				"viewport": {
					"northeast": {
						"lat": 36.49790812989272,
						"lng": -117.2263334701073
					},
					"southwest": {
						"lat": 36.49520847010727,
						"lng": -117.2290331298927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "e3c4616de5d7dd1e30843a1c4ec06f454dd44b84",
			"name": "Emigrant Campground",
			"photos": [
				{
					"height": 1488,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/116786911444162622775/photos\">James McGillis</a>"
					],
					"photo_reference": "CmRaAAAAnpFG6eK8IX4mNoB3S250cjghIaFW7z-ol1_IwEs2rAnIO5r4UhuJDUoDK8PBkVlozP_026vbN2xPy7cgF2SwMojeBxDZ6W29H8bu1Vv3WYJwsFfJ-FVY6k-MEfdloDifEhBeOql4tmmvfESO-FfeBG30GhTXozEnHG6P37DPqBiOjlocpXEllw",
					"width": 1984
				}
			],
			"place_id": "ChIJHwXPNKSzwIARetCNufRQBPw",
			"rating": 4.2,
			"reference": "CmRbAAAA6FuFaLnwPqFg32oWfyk5jBM2kT_vjVut-eum6YFpCHUNJ0jP8YtO5NYT0t61lTMPBw27r8IqBUlmTpDyb9yCQAQYMpLfsbEDnaFrKbWW1G9Kt_MAm6kForcu2rK2p1z6EhDPtI55F0ED6tBSxFOGaCYIGhRl5a460ol66k9-d3EBhpU8mhVnog",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "Cottonwood Canyon Rd, California 92328, USA",
			"geometry": {
				"location": {
					"lat": 36.6072111,
					"lng": -117.1477472
				},
				"viewport": {
					"northeast": {
						"lat": 36.60836677989271,
						"lng": -117.1465780201073
					},
					"southwest": {
						"lat": 36.60566712010727,
						"lng": -117.1492776798927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "ba53b3354248bfd509a36eeecef0f38d8dfb3c8d",
			"name": "Stovepipe Wells Campground",
			"photos": [
				{
					"height": 2952,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/110689004972504299832/photos\">cres ramos</a>"
					],
					"photo_reference": "CmRaAAAAj_1fgnhFsLz2rtvTA3aCAPRtA7LeiSw93_sjjUKErYQwA6v2Oj7cW7MgGUji-iXumYbbdpi2SHs-6ceJzcfK8VsYXV3illsqAnTF0gPgHcLILza09fUc0GAj82-8sovIEhA02AUt201HGWcxKYTQt1eMGhRermxcbuLRFVrNcW8_4QvDX1mXrQ",
					"width": 5248
				}
			],
			"place_id": "ChIJJ3wjJ-BSx4ARGXm0M7RFrc4",
			"rating": 4.2,
			"reference": "CmRbAAAALniyPTyquA8KPDhkGDuww_WtW_vKZSgIsyc8FkfJ3bjN7OKZQDISomspjdXPF5QWFQerQUf_SvggyMTXsvhH5o_zJpf1QK9Q-L7PC4fpNuPEzhKFfmRdabqxJPAX7d27EhBtv7UQxFhDQhOsPYIo7kffGhQusL6KYgm7NDcsQsZM6tgJ0M5iHA",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "Death Valley, Death Valley National Park, DEATH VALLEY, CA 92328, United States",
			"geometry": {
				"location": {
					"lat": 36.8128786,
					"lng": -117.7661246
				},
				"viewport": {
					"northeast": {
						"lat": 36.81422842989273,
						"lng": -117.7647747701073
					},
					"southwest": {
						"lat": 36.81152877010729,
						"lng": -117.7674744298927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "beb6cef9a28eefe243336a7164482ece39f3f3fb",
			"name": "Saline Valley Warm Springs",
			"photos": [
				{
					"height": 1836,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/105834405535650293794/photos\">Yubert Fang</a>"
					],
					"photo_reference": "CmRaAAAAnshOz09sZmbglxCRXeh_Wmz29grE7dBeYXJCwk2wlG-QTnu_iJ_5hfH9lbzwOCmmkfJj2cgCc129mQTCtPzZk_qK7jwld7SHlgv1f2tvqazZw8J7Wq18vZt3MoEsrY55EhC2F-1iOHNeleseeoKq_UoLGhT2Bxe9QYzE--ebWWh41yzs9gQV1g",
					"width": 3264
				}
			],
			"place_id": "ChIJJ71OJ4pxv4ARWr63dVyZ4gY",
			"rating": 3.5,
			"reference": "CmRbAAAA1CJdBvnGEozUJMTogKTatI25uOOmAB-sVgic9SvQ7z7CkD_zNpLdEyTnvYQ7lPw4BC9R3o_oInCS78fwGy06VqaBL_daTRcLVvKgSpiHAOvEojTV1rKAuNjIwu33X5SOEhBX1baCcC5MOLk9p5ol-8yMGhSH3bj7uSjupXFngSCAl329ftUV-Q",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "California 99901, USA",
			"geometry": {
				"location": {
					"lat": 36.2368944,
					"lng": -117.0721722
				},
				"viewport": {
					"northeast": {
						"lat": 36.23824422989272,
						"lng": -117.0708223701073
					},
					"southwest": {
						"lat": 36.23554457010727,
						"lng": -117.0735220298928
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "9bd9f905fe553a285a12c0cc81825e2987171457",
			"name": "Thorndike Campground",
			"place_id": "ChIJzRB2vnAux4ARuf-FPilJWbA",
			"rating": 4,
			"reference": "CmRbAAAAXKqL7TAciylJH3651smZr0_jLfji-_kOIAd1DEdY73amy43kBFevNnh7W3aw4aZV9fTnP3cNCyhFkc2CSUbWh2qV9BBm2neej4EFQo3-kyQPReyzN5s1T1ysj3yRgHLIEhDI45BRc2z5OdygG9VIvyKpGhSIQlQc4gxllB1PiKjLBuX0oMjYJw",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "Furnace Creek, CA 92328, USA",
			"geometry": {
				"location": {
					"lat": 36.4604506,
					"lng": -116.866985
				},
				"viewport": {
					"northeast": {
						"lat": 36.46180042989273,
						"lng": -116.8656351701073
					},
					"southwest": {
						"lat": 36.45910077010728,
						"lng": -116.8683348298928
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "ac6695de0ff29d7b03ff57493335552e5f45057a",
			"name": "Furnace Creek Resort Campground",
			"photos": [
				{
					"height": 2592,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/110864080364029226985/photos\">A Google User</a>"
					],
					"photo_reference": "CmRaAAAArKUnvMtIhyZIiJdQ6BOFYB8UhUvtSsBvahAoKFqlrkWAyj2zNUBh9a8fgl-Lodp0nM8iCjCIu_MerVtR6hW6UQJg29VM9lbAapbOQFV8DNgBg4BNIvBMxL_qXjI1T3DbEhDpOko6m_wrTWLdFYpk3BKIGhQbQoBR37M8NVYuQ7sbzC2QlLa9qQ",
					"width": 3872
				}
			],
			"place_id": "ChIJl24xc2o_x4ARTkib-g-NLXE",
			"rating": 3.8,
			"reference": "CmRbAAAAcytEz6DJuB00FULOOCv4U_tWPFBHQbwFYA9hKP46jzFQAdjjrM3hQQcp8VW-pmIPek-J9nMiWGwJKP3W0imymoYP1J0ZtLAm_lCa7x0oYguoCJ9rdWbX9rUyOfzfKUR1EhCroUI66MxB2n9alFyS_UHvGhQdVRWXGjuxEAapIYGJzY3Mt22Maw",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "California, USA",
			"geometry": {
				"location": {
					"lat": 36.6375356,
					"lng": -117.5740045
				},
				"viewport": {
					"northeast": {
						"lat": 36.63888542989272,
						"lng": -117.5726546701073
					},
					"southwest": {
						"lat": 36.63618577010728,
						"lng": -117.5753543298927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "f1319aab4c8d7272c1818779e0c5a800dfc9547a",
			"name": "Homestake Dry Camp",
			"photos": [
				{
					"height": 2592,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/111315544653779648354/photos\">kyungyul hwang</a>"
					],
					"photo_reference": "CmRaAAAANVqACIi4vOVvplic26BHfHqJ6R1pg3dGI_gVAueSttzJgG1ZM_jcJpXpFGffLomIWbaV9tcVTC67KRH_9faKKR3o4E3PBuqkaOF9ZegHAmjNKLPAdKtdialeQ8r4WuiBEhAEwiyBwi96IjH-bcgtkoUOGhQv_6Ysa09Nunw5u3CjAiCJRfR9Rw",
					"width": 3888
				}
			],
			"place_id": "ChIJTVAl4D1gv4ARI8RyLAEaYZs",
			"rating": 4.7,
			"reference": "CmRbAAAAcUGPaXc6lTw4nJJiG64qW9hYyK5m8vXHfNyZERlyRhNCcL6eUMqZh1ypPrkksdgdIFhXfhsQ5I3sejKbuK4uZn7nyDkHDKNvLWLOieJFjzkPYU_-IPpKYl9zn9yXEXz3EhCxE1sQ3VhcKYaruKCx3GncGhQZAQyS-jbYIoEObmfZ1UpzZmeVfQ",
			"types": [
				"campground",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		},
		{
			"formatted_address": "40440 CA-190, Panamint Springs, CA 93545, USA",
			"geometry": {
				"location": {
					"lat": 36.3403516,
					"lng": -117.4679982
				},
				"viewport": {
					"northeast": {
						"lat": 36.34141702989272,
						"lng": -117.4667552701073
					},
					"southwest": {
						"lat": 36.33871737010728,
						"lng": -117.4694549298927
					}
				}
			},
			"icon": "https://maps.gstatic.com/mapfiles/place_api/icons/camping-71.png",
			"id": "de22431afd4e8a87c397f601d6c4f36ede54006b",
			"name": "Panamint Springs RV Park",
			"photos": [
				{
					"height": 2988,
					"html_attributions": [
						"<a href=\"https://maps.google.com/maps/contrib/110079079499345757051/photos\">John Nunya</a>"
					],
					"photo_reference": "CmRaAAAAE4QS85WvO1JQv9OF5fW0dvrAkgrVxiT1IdavFfXHTSjg7biqANnBjdYujZ9bd8gvi3S9hipcrp6BFV7NL2yVj8T3b16K02ZdhbgvUegFaUjkrUVVABQSP-EQSFujF3m3EhANNg6TqUrmtxBwLY90ukrpGhQMkP6EDThgus5YjI3CoD2UGrI-Zw",
					"width": 5312
				}
			],
			"place_id": "ChIJYWGTUUW_wIAR7ga_NrZDKkU",
			"rating": 4.4,
			"reference": "CmRbAAAAEy5H992UnZPGxuKUIIOu8vcVsSIxCza80Mxpi7yHQYb2K_m0Z1nG4yp0Wsu6bXgf_V1XKgKgswvQ6fhHT1PG87EeRsmFUWW5CqJRnu2sCWd0516ia2e7drnulDzykyR-EhDv5mGL422R05KvoFWIWm-YGhQWOEDidxyHpSGDeTXlKzWbOptjOA",
			"types": [
				"campground",
				"rv_park",
				"park",
				"lodging",
				"point_of_interest",
				"establishment"
			]
		}
	],
	"status": "OK"
};

var parking = {

    "html_attributions":{
    },
    "results":[
        {
            "formatted_address":"California 92328, USA",
            "geometry":{
                "location":{
                    "lat":36.3662019,
                    "lng":-116.7040783
                },
                "viewport":{
                    "northeast":{
                        "lat":36.36755172989272,
                        "lng":-116.7027284701073
                    },
                    "southwest":{
                        "lat":36.36485207010728,
                        "lng":-116.7054281298927
                    }
                }
            },
            "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
            "id":"9530ac1060a8185ef2f2a85fb93391336a727dc0",
            "name":"Death Valley Pay Station",
            "photos":[
                {
                    "height":1280,
                    "html_attributions":[
                        '<a href="https://maps.google.com/maps/contrib/110183155329349537125/photos">Novarossi</a>'
                    ],
                    "photo_reference":"CmRaAAAAFLt3P2eabnimulcUqyh8NO5b4Vd_HVTfPbuo6Bo0N5Zcd-To_-4SFgpi1GDli8VM46TGiuymv4xOJ_xB1BfoV3PiuN_u9Jd4fa-8RA3Gq52JVWTCKpPtweNJjNsWxEXnEhAGAqc1zN_dp0I4kWvIz05lGhTxTbIWIquKz8OOmaMrjJwYJyB_rw",
                    "width":1920
                }
            ],
            "place_id":"ChIJoRKKaU0Xx4ARSjEcLDbj0d0",
            "rating":4.1,
            "reference":"CmRbAAAAbUpndHK29Xl1BrkS9vww_Y9cTmvWXn1iUaPvHDkMh9qd5Q7eCKtt-4_5abDU-sUILuF-iDfwCRNajdeiragT-wzyUsVoZ8byV8mmCIyQq14SU0snV6rDDWu7ZGPPqayMEhBEX9ekeXHHUG1_hAdB96s8GhQm_vSitgmshvSsjOpovBr41el06w",
            "types":[
                "parking",
                "point_of_interest",
                "establishment"
            ]
        },
        {
            "formatted_address":"Death Valley, CA, USA",
            "geometry":{
                "location":{
                    "lat":36.6375356,
                    "lng":-117.5740045
                },
                "viewport":{
                    "northeast":{
                        "lat":36.63888542989272,
                        "lng":-117.5726546701073
                    },
                    "southwest":{
                        "lat":36.63618577010728,
                        "lng":-117.5753543298927
                    }
                }
            },
            "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
            "id":"8c91b0fea2c39789eb9358c812e977e4eeb55a14",
            "name":"Death Valley National Park's backcountry",
            "photos":[
                {
                    "height":3000,
                    "html_attributions":[
                        '<a href="https://maps.google.com/maps/contrib/106364709108144042629/photos">Jason Collins</a>'
                    ],
                    "photo_reference":"CmRaAAAA_DELO8Y3818_f8Uf-kqzz0GFe8UX0GnVOiLMYZ53F5eh7rfOzHa7L7ixhdxtqwU9KjxRutk8G2whIcanZc97Cnmzv2b9tN27zIyHk5nDIv1Y1t64VsklX6NbSQQ5HXMMEhD6YfieD3oyb-Gqxs83vlbqGhQrEpA6KlkoWMfYhEFS0XyTkAsC4w",
                    "width":4000
                }
            ],
            "place_id":"ChIJfctw7z1gv4ARtu2wBRaDhjo",
            "rating":4.2,
            "reference":"CmRbAAAAH85Y9xEmwMmnKxbJJ0Jlsfc0npRweXbWGTS-MGlpr29Yf4B_esvTqk8tVq03ojBYUFCIIZFJYMBHWsYx7DEJON7rJc6gknGR9FfVkjI5koLS04wtCEpvBy5GDp6-ZJ3uEhC7CZcB_6ZMuc5YZYQriqt7GhSqTwM_6ap688JsiFRQUY2sYXDpdg",
            "types":[
                "parking",
                "point_of_interest",
                "establishment"
            ]
        }
    ],
    "status":"OK"

}

var emptyCardsAndParks = function() {
    $("#cardsHere").empty();
    $("#sampleParks").empty();

    var pois = $("<h2>");
    pois.addClass("fredericka");
    pois.html("<br>Points of Interest<br>");
    $("#cardsHere").append(pois);
};

var campgroundSearch = function() {

    for (var i = 0; i < 4; i++) {
        var bootstrapCard = $("<div>");
        bootstrapCard.addClass("card col-md-3 ml-3 mr-3 mb-3 pt-3 attraction");
        bootstrapCard.attr("style", "width: 18rem;");
        bootstrapCard.attr("data-id", campground.results[i].id);
        bootstrapCard.attr("data-lat", campground.results[i].geometry.location.lat);
        bootstrapCard.attr("data-lng", campground.results[i].geometry.location.lng);
        
        var cardBody = $("<div>");
        cardBody.addClass("card-body");

        var cardImg = $("<img>");
        cardImg.addClass("card-img-top");
        cardImg.attr("src", "assets/images/campground/" + i + ".jpg");
        cardImg.attr("alt", campground.results[i].name)

        var cardTitle = $("<h5>");
        cardTitle.addClass("card-title fredericka");
        cardTitle.text(campground.results[i].name);

        cardBody.append(cardTitle);
        bootstrapCard.append(cardImg);
        bootstrapCard.append(cardBody);

        $("#cardsHere").append(bootstrapCard);
    };
}

var parkingSearch = function() {

    for (var i = 0; i < 2; i++) {
        var bootstrapCard = $("<div>");
        bootstrapCard.addClass("card col-md-3 ml-3 mr-3 mb-3 pt-3 attraction");
        bootstrapCard.attr("style", "width: 18rem;");
        bootstrapCard.attr("data-id", parking.results[i].id);
        bootstrapCard.attr("data-lat", parking.results[i].geometry.location.lat);
		bootstrapCard.attr("data-lng", parking.results[i].geometry.location.lng);
		bootstrapCard.attr("data-name", parking.results[i].name);
        
        var cardBody = $("<div>");
        cardBody.addClass("card-body");

        var cardImg = $("<img>");
        cardImg.addClass("card-img-top");
        cardImg.attr("src", "assets/images/parking/" + i + ".jpg");
        cardImg.attr("alt", parking.results[i].name)

        var cardTitle = $("<h5>");
        cardTitle.addClass("card-title fredericka");
        cardTitle.text(parking.results[i].name);

        cardBody.append(cardTitle);
        bootstrapCard.append(cardImg);
        bootstrapCard.append(cardBody);

        $("#cardsHere").append(bootstrapCard);
    };

        // $(".jsonHere").text(JSON.stringify(response,null,'\t'));

};

$(document).on("click", ".park-button", function(event) {
    event.preventDefault()

    clickedPark = $(this).data("park");
    console.log(clickedPark);
    $('#destinationSearch').val(clickedPark);
    var e = $.Event( "keypress", { which: 13 } );
	$('#destinationSearch').trigger(e);

    emptyCardsAndParks();

    campgroundSearch();

	parkingSearch();

    window.scrollTo(0, 620);

    map.panTo(new google.maps.LatLng(
		36.505,
		-117.079
		));

	map.setZoom(10);

	markers.forEach(function(marker) {
		marker.setMap(null);
	});
	markers = [];

    markers.push(new google.maps.Marker({
        position: {lat: 36.505, lng: -117.079},
        map: map,
        title: 'Death Valley National Park'
	}));

	dataRef.ref().push({
        name: clickedPark,
        lat: $(this).data("lat"),
        lng: $(this).data("lng"),
        dateAdded: firebase.database.ServerValue.TIMESTAMP
	});

});

// for clicking on recent searches
$(document).on("click", ".recentSearches", function(event) {

    clickedPark = $(this).data("name");
    console.log(clickedPark);
    $('#destinationSearch').val(clickedPark);
    geolocateThenWeatherSearch();

    emptyCardsAndParks();

    placesTextSearch("campground", 6);

        setTimeout(function() {
            placesTextSearch("parking", 2);
        }, 1000);

    // scrolls the page back up to the google map
    // desireability of this behavior is debatable
    window.scrollTo(0, 620);

    // pans the google map to the location of the clicked park
    map.panTo(new google.maps.LatLng(
        $(this).data("lat"),
        $(this).data("lng")
    ));
    map.setZoom(10);

    // clears any existing makers
    markers.forEach(function(marker) {
        marker.setMap(null);
    });
    markers = [];

    // places a marker on the location of the park represented by the card that was clicked
    markers.push(new google.maps.Marker({
        position: {lat: $(this).data("lat"), lng: $(this).data("lng")},
        map: map,
        title: $(this).data("park")
	}));

});

$(document).on("click", ".attraction", function(event) {
	window.scrollTo(0, 620);
	map.panTo(new google.maps.LatLng(
		$(this).data("lat"),
		$(this).data("lng")
		));
	
	map.setZoom(15);

	markers.forEach(function(marker) {
		marker.setMap(null);
	});
	markers = [];

});

var renderTrail = function(){
	// Empty trails div every time that future searches don't get appended to previous search
	$("#trails").empty();

	// Add header 
	var hike = $("<h2>");
	hike.addClass("fredericka");
	hike.html("<br>Closest Hiking Trails<br>");
	$("#trails").append(hike);

	for (var i=0; i < trails.length; i++) {
		var bootstrapCard = $("<div>");
		bootstrapCard.addClass("card col-md-3 ml-3 mr-3 mb-3 pt-3 suggested-trail");
		bootstrapCard.attr("style", "width: 18rem;");

		var cardBody = $("<div>");
		cardBody.addClass("card-body");
		
		var cardImg = $("<img>");
		cardImg.addClass("card-img-top");
		cardImg.attr("src", trails[i].imgSmallMed);
		cardImg.attr("alt", trails[i].name);
		
		var cardTitle = $("<h5>");
		cardTitle.addClass("card-title fredericka");
		cardTitle.text(trails[i].name);

		var cardLocation= $("<p>");
		cardLocation.addClass("card-text oswald");
		cardLocation.html("<br>Location: " + trails[i].location);

		var cardDistance= $("<p>");
		cardDistance.addClass("card-text oswald");
		cardDistance.html("<br>Total distance: " + trails[i].length + " miles");
		
		var cardElevation= $("<p>");
		cardElevation.addClass("card-text oswald");
		cardElevation.html("<br>Elevation: " + trails[i].ascent + " feet");

		var cardRating= $("<p>");
		cardRating.addClass("card-text oswald");
		cardRating.html("<br>Average Rating: " + trails[i].stars + " stars/5 (" + trails[i].starVotes + " ratings)");

		var cardSummary=$("<p>");
		cardSummary.addClass("card-text oswald");
		cardSummary.html("<br>" + trails[i].summary);
		
		cardRating.append(cardSummary)
		cardElevation.append(cardRating)
		cardDistance.append(cardElevation)
		cardLocation.append(cardDistance)
		cardTitle.append(cardLocation);
		cardBody.append(cardTitle);
		bootstrapCard.append(cardImg);
		bootstrapCard.append(cardBody);
		$("#trails").append(bootstrapCard);

	}
};

var renderSuggestedGearCards = function(conditions) {
	for (var i = 0; i < conditions.length; i++) {
		var bootstrapCard = $("<div>");
		bootstrapCard.addClass("card col-md-3 ml-3 mr-3 mb-3 pt-3 suggested-gear");
		bootstrapCard.attr("style", "width: 18rem;");

		var cardBody = $("<div>");
		cardBody.addClass("card-body");
		
		var cardImg = $("<img>");
		cardImg.addClass("card-img-top");
		cardImg.attr("src", conditions[i].src);
		cardImg.attr("alt", conditions[i].name);
		
		var cardTitle = $("<h4>");
		cardTitle.addClass("card-title fredericka");
		cardTitle.text(conditions[i].name);

		var buyIt = $("<div>");
		var buyLink = $("<a>");
		buyLink.addClass("btn btn-success oswald mb-4");
		buyLink.attr("href", conditions[i].href);
		buyLink.attr("target", "_blank");
		buyLink.text("Show me my options!");
		buyIt.append(buyLink);
		
		cardBody.append(cardTitle);
		bootstrapCard.append(cardImg);
		bootstrapCard.append(cardBody);
		bootstrapCard.append(buyIt);

		$("#gearDiv").append(bootstrapCard);
	};
};

// show gear based on temperature
var renderSuggestedGear = function() {
	// hardcoded gear for hot weather
	var hotGear = [
		{name: "Camelbak", src: "assets/images/hot/camelbak.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=camelbak"},
		{name: "Cooler", src: "assets/images/hot/cooler.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss_1?field-keywords=camping+coolers"},
		{name: "Sun hats", src: "assets/images/hot/sunhat.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=sun+hat"},
		{name: "Portable fan and spraybottle", src: "assets/images/hot/waterfan.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=water+fan"}
	];
	
	// hardcoded gear for cold weather
	var coldGear = [
		{name: "Instant heat handwarmer", src: "assets/images/cold/instantheat.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=instant+heat+pack"},
		{name: "Jacket", src: "assets/images/cold/jacket.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=cold+weather+jacket"},
		{name: "Cold weather sleeping bag", src: "assets/images/cold/sleepingbag.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=sleeping+bag"},
		{name: "Gloves", src: "assets/images/cold/snowgloves.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=cold+weather+gloves"},
		{name: "Sweater", src: "assets/images/cold/sweater.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=outdoor+sweater"}
	];

	// hardcoded gear for general conditions
	var generalGear = [
		{name: "Boots", src: "assets/images/regulartemp/boot.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=hiking+boots"},
		{name: "Water bottle", src: "assets/images/regulartemp/bottle.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=reusable+water+bottle"},
		{name: "Bug spray", src: "assets/images/regulartemp/bugspray.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=bug+spray"},
		{name: "First aid kit", src: "assets/images/regulartemp/firstaid.jpg", href: "https://www.amazon.com/s/ref=nb_sb_noss?field-keywords=first+aid"}
	];

	$("#gear").empty();

	var gearTitleRow = $("<div>");
	gearTitleRow.addClass("row text-center mt-3 mb-3");
	var gearTitleColumn = $("<div>");
	gearTitleColumn.addClass("col-md");

	var gearTitle = $("<h2>");
	gearTitle.addClass("fredericka");
	gearTitle.text("Suggested gear")
	gearTitleColumn.append(gearTitle);
	gearTitleRow.append(gearTitleColumn);

	$("#gear").append(gearTitleRow);

	var gearDiv = $("<div>");
	gearDiv.addClass("row justify-content-center text-center");
	gearDiv.attr("id", "gearDiv");

	$("#gear").append(gearDiv);

	if (weatherObservation.temp_c > 30) {
		renderSuggestedGearCards(hotGear);	
	}
	else if (weatherObservation.temp_c < 10) {
		renderSuggestedGearCards(coldGear);
	}
	else {
		renderSuggestedGearCards(generalGear);
	};
};

var renderWeather = function() {
	$("#weather").empty();

	var weatherTitleRow = $("<div>");
	weatherTitleRow.addClass("row text-center mt-3");
	var weatherTitleColumn = $("<div>");
	weatherTitleColumn.addClass("col-md");

	var weatherTitle = $("<h2>");
	weatherTitle.addClass("fredericka");
	weatherTitle.text("Weather")
	weatherTitleColumn.append(weatherTitle);
	weatherTitleRow.append(weatherTitleColumn);

	$("#weather").append(weatherTitleRow);

	var cardRow = $("<div>");
	cardRow.addClass("row justify-content-center mx-auto oswald");

	var cardColumn = $("<div>");
	cardColumn.addClass("col-md-12 justify-content-center mx-auto mb-3");

	var currentWeatherCard = $("<div>");
	currentWeatherCard.addClass("card mx-auto");
	currentWeatherCard.attr("style", "width: 26rem;")

	var cardHeader = $("<div>");
	cardHeader.addClass("card-header text-center");
	var cardHeaderText = $("<h3>");
	cardHeaderText.text($("#destinationSearch").val());
	cardHeaderText.addClass("oswald");
	var weatherIcon = $("<img>");
	weatherIcon.attr("alt", weatherObservation.icon);
	weatherIcon.attr("src", weatherObservation.icon_url);
	cardHeaderText.append("<br>Current conditions ")
	cardHeaderText.append(weatherIcon);
	cardHeader.append(cardHeaderText);
	currentWeatherCard.append(cardHeader);

	var listGroup = $("<ul>");
	listGroup.addClass("list-group list-group-flush");

	var listCondition = $("<li>");
	listCondition.addClass("list-group-item");
	listCondition.text("Weather: " + weatherObservation.weather);
	listGroup.append(listCondition);

	var listTemperature = $("<li>");
	listTemperature.addClass("list-group-item");
	listTemperature.text("Temperature: " + weatherObservation.temperature_string);
	listGroup.append(listTemperature);

	var listFeelsLike = $("<li>");
	listFeelsLike.addClass("list-group-item");
	listFeelsLike.text("Feels like: " + weatherObservation.feelslike_string);
	listGroup.append(listFeelsLike);

	var listWind = $("<li>");
	listWind.addClass("list-group-item");
	listWind.text("Wind: " + weatherObservation.wind_string);
	listGroup.append(listWind);

	currentWeatherCard.append(listGroup);

	cardColumn.append(currentWeatherCard);
	cardRow.append(cardColumn);
	$("#weather").append(cardRow);

	var forecastRow = $("<div>");
	forecastRow.addClass("row mt-3");
	var forecastColumn = $("<div>");
	forecastColumn.addClass("col-md-8 mx-auto justify-content-center");

	var forecastTable = $("<table>");
	forecastTable.addClass("table table-striped")
	var tableHead = $("<thead>");
	var tableHeadRow = $("<tr>");

	var tableHeadDay = $("<th>");
	tableHeadDay.attr("scope", "col");
	tableHeadDay.text("Day");
	tableHeadRow.append(tableHeadDay);

	var tableHeadForecast = $("<th>");
	tableHeadForecast.addClass("text-center");
	tableHeadForecast.attr("scope", "col");
	tableHeadForecast.attr("colspan", 2);
	tableHeadForecast.text("Forecast");
	tableHeadRow.append(tableHeadForecast);

	tableHead.append(tableHeadRow);
	forecastTable.append(tableHead);

	var forecastBody = $("<tbody>");

	for (var i = 0; i < weatherForecast.txt_forecast.forecastday.length; i++) {
		var forecastEntry = $("<tr>");

		var forecastDay = $("<td>");
		forecastDay.text(weatherForecast.txt_forecast.forecastday[i].title);
		forecastEntry.append(forecastDay);

		var forecastIcon = $("<td>");
		var weatherIcon = $("<img>");
		weatherIcon.attr("alt", weatherForecast.txt_forecast.forecastday[i].icon);
		weatherIcon.attr("src", weatherForecast.txt_forecast.forecastday[i].icon_url);
		forecastIcon.append(weatherIcon);
		forecastEntry.append(forecastIcon);

		var forecastText = $("<td>");
		forecastText.text(weatherForecast.txt_forecast.forecastday[i].fcttext);
		forecastEntry.append(forecastText);

		forecastBody.append(forecastEntry);
	};

	forecastTable.append(forecastBody);
	forecastColumn.append(forecastTable);
	forecastRow.append(forecastColumn);
	$("#weather").append(forecastRow);

	renderSuggestedGear();

};

var trailSearch = function() {
	var trailqueryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon="+ longitude +"&maxDistance=10&key=200268815-4f75cb4511228bcd2861fe407fc89421"
	
	$.ajax({
	url: trailqueryURL,
	method: "GET"
	}).then(function(trailresponse){
		console.log(trailresponse);
		trails = trailresponse.trails;
		renderTrail();
	});
};

var weatherSearch = function() {
	console.log(latitude);
	console.log(longitude);
	var queryURL = "https://api.wunderground.com/api/a44fd7abe0ac90f0/forecast/geolookup/conditions/q/" + latitude + "," + longitude + ".json";
		console.log(queryURL);
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
		console.log(response);
		weatherObservation = response.current_observation;
		weatherForecast = response.forecast;
		renderWeather();
	});
};

var geolocateThenWeatherSearch = function() {
	var searchQuery = $("#destinationSearch").val();
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchQuery + "&key=AIzaSyD6-UaTdmfPpw2x9P0Hf66Rl2XdzCwJvOQ";
    // console.log(queryURL);
    
    // Creates AJAX call
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
		geocodeResponse = response;
		latitude = geocodeResponse.results[0].geometry.location.lat.toFixed(1);
		longitude = geocodeResponse.results[0].geometry.location.lng.toFixed(1);
		weatherSearch();
		trailSearch();

		// pushing the searched park into Firebase
		if (recentSearch.indexOf(searchQuery) === -1) {
			dataRef.ref().push({
				name: searchQuery,
				lat: latitude,
				lng: longitude,
				dateAdded: firebase.database.ServerValue.TIMESTAMP
			});
		}
		else {
			console.log("Not pushing this search into Firebase, as it is a duplicate.")
		};
	});
};

document.getElementById("destinationSearch").onkeypress = function(event){
	if (event.keyCode == 13 || event.which == 13){
		
		geolocateThenWeatherSearch();

	}
};