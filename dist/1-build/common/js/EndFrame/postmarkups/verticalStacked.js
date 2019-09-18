import { Styles, Markup, Align, Effects } from "ad-view";
import { ImageManager } from "ad-control";
import { Animation } from "@common/js/Animation.js";
import { Control } from "@common/js/Control.js";
import CanvasIris from "@common/js/CanvasIris.js";
import {
  UIComponent,
  UIBorder,
  UIButton,
  UIImage,
  TextFormat,
  UITextField,
  UISvg
} from "ad-ui";
import { ObjectUtils } from "ad-utils";
import { titleTreatmentLayout, stackedBrandingLockup } from "./shared.js";

export default function verticalStacked({
  tuneInFontSize = 16,
  // offset between elements in branding lockup
  brandingLockupOffset = 11,
  // describe how to align branding lockup elems against each other
  brandingLockupElemXAlign = Align.LEFT,
  brandingLockupAlign = {
    x: {
      type: Align.LEFT,
      offset: 16
    },
    y: {
      type: Align.BOTTOM,
      offset: -16
    }
  }
} = {}) {
  let T = View.endFrame;

  // title treatment
  titleTreatmentLayout(T);

  Align.set(T.pedigree, {
    x: {
      type: Align.CENTER,
      against: T.tt
    },
    y: {
      type: Align.CENTER,
      against: 55
    }
  });

  // encompasses CTA, logo and tune-in/FTM if available
  stackedBrandingLockup(T, {
    brandingLockupOffset,
    brandingLockupElemXAlign,
    brandingLockupAlign,
    tuneInFontSize
  });

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
    });
  } else {
    T.removeChild(T.ratingsBug);
  }

  // ensure iris renderer is at top of endFrame
  if (T.iris) {
    T.appendChild(T.iris.canvas);
  }
}
