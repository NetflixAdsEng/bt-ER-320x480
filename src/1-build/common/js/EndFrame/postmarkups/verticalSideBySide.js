import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import CanvasIris from '@common/js/CanvasIris.js'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { ObjectUtils } from 'ad-utils'
import { titleTreatmentLayout, sideBySideBrandingLockup } from './shared.js'

export default function sideBySidePostMarkup({
	ctaLogoOffset = 13,
	tuneInFontSize = 16,
	tuneInLockupOffset = 15,
	brandingLockupAlign = {
		x: Align.CENTER,
		y: {
			type: Align.BOTTOM,
			offset: -16
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

	// side-by-side branding
	// encompassing CTA, logo, and tune-in/FTM
	sideBySideBrandingLockup(T, {
		ctaLogoOffset,
		tuneInFontSize,
		tuneInLockupOffset,
		brandingLockupAlign
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
