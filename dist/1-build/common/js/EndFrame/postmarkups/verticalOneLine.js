import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg, UIGroup } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import { titleTreatmentLayout } from './shared.js'

export default function verticalOneLine({
	brandingLockupOffset = 11,
	tuneInFontSize = 14,
	brandingLockupAlign = {
		x: Align.CENTER,
		y: {
			type: Align.TOP,
			against: 210
		}
	}
} = {}) {
	let T = View.endFrame

	// title treatment
	titleTreatmentLayout(T)

	Align.set(T.pedigree, {
		x: {
			type: Align.CENTER,
			against: T.tt
		},
		y: {
			type: Align.CENTER,
			against: 55
		}
	})

	// possible text element that would appear between logo and CTA
	let textElem
	if (adData.hasFTM) {
		textElem = T.ftm
		// free trial messaging
		Styles.setCss(T.ftm, {
			color: '#fff',
			fontSize: tuneInFontSize - 2,
			letterSpacing: 1,
			textAlign: 'center'
		})
		T.removeChild(T.tuneIn)
	}

	if (adData.hasTuneIn) {
		textElem = T.tuneIn
		// tune-in
		Styles.setCss(T.tuneIn, {
			color: '#fff',
			fontSize: tuneInFontSize,
			letterSpacing: 1,
			textAlign: 'center'
		})
		T.removeChild(T.ftm)
	}

	if (textElem) {
		Align.set(textElem, {
			against: T.netflixLogo,
			x: {
				type: Align.RIGHT,
				outer: true,
				offset: brandingLockupOffset
			},
			y: Align.CENTER
		})
	}

	// cta
	T.cta.resize()
	Align.set(T.cta, {
		against: textElem || T.netflixLogo,
		x: {
			type: Align.RIGHT,
			outer: true,
			offset: brandingLockupOffset
		},
		y: Align.CENTER
	})

	const children = [T.netflixLogo, T.cta]

	if (adData.hasFTM) {
		children.push(T.ftm)
	}

	if (adData.hasTuneIn) {
		children.push(T.tuneIn)
	}

	T.brandingLockup = new UIGroup({
		target: T,
		children,
		align: brandingLockupAlign
	})

	// ratings bug
	if (adData.hasRatings) {
		Align.set(T.ratingsBug, {
			x: {
				type: Align.RIGHT,
				offset: -5
			},
			y: {
				type: Align.BOTTOM,
				offset: -5
			}
		})
	} else {
		T.removeChild(T.ratingsBug)
	}

	// ensure iris renderer is at top of endFrame
	if (T.iris) {
		T.appendChild(T.iris.canvas)
	}
}
