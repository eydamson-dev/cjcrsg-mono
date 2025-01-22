import { Options } from "qr-code-styling"


const config:Partial<Options> = {
  "image": "/favicon-192x192.png",
  "type": "svg",
  "shape": "square",
  "width": 300,
  "height": 300,
  "data": "http://localhost:3000/profile",
  "margin": 0,
  "qrOptions": {
    "typeNumber": 0,
    "mode": "Byte",
    "errorCorrectionLevel": "Q"
  },
  "imageOptions": {
    "saveAsBlob": true,
    "hideBackgroundDots": true,
    "imageSize": 0.4,
    "margin": 0
  },
  "dotsOptions": {
    "type": "rounded",
    "color": "#6a1a4c",
    "roundSize": true,
    "gradient": {
      "type": "linear",
      "rotation": 1.6580627893946132,
      "colorStops": [
        {
          "offset": 0,
          "color": "#304080"
        },
        {
          "offset": 1,
          "color": "#8d4b8f"
        }
      ]
    }
  },
  "backgroundOptions": {
    "round": 0,
    "color": "#ffffff",
  },
  "dotsOptionsHelper": {
    "colorType": {
      "single": true,
      "gradient": false
    },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#6a1a4c",
      "color2": "#6a1a4c",
      "rotation": "0"
    }
  },
  "cornersSquareOptions": {
    "type": "extra-rounded",
    "color": "#304080"
  },
  "cornersSquareOptionsHelper": {
    "colorType": {
      "single": true,
      "gradient": false
    },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#000000",
      "color2": "#000000",
      "rotation": "0"
    }
  },
  "cornersDotOptions": {
    "color": "#304080",
  },
  "cornersDotOptionsHelper": {
    "colorType": {
      "single": true,
      "gradient": false
    },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#000000",
      "color2": "#000000",
      "rotation": "0"
    }
  },
  "backgroundOptionsHelper": {
    "colorType": {
      "single": true,
      "gradient": false
    },
    "gradient": {
      "linear": true,
      "radial": false,
      "color1": "#ffffff",
      "color2": "#ffffff",
      "rotation": "0"
    }
  }
}

export default config
