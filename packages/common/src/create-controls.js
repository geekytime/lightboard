import * as dat from "dat.gui"

const createControls = (context) => {
  const gui = new dat.GUI({ closed: true })
  gui.add(context, "lightSize", { sm: 30, md: 50, lg: 80, xl: 110 })
  gui.add(context, "fadeSpeed", { slow: 750, med: 500, fast: 250 })
  gui.add(context, "decaySpeed", {
    never: 0,
    "15s": 10000,
    "10s": 10000,
    "5s": 5000,
    "3s": 3000,
    "2s": 2000,
    "1s": 1000
  })
  const colors = gui.addFolder("colors")
  colors.addColor(context, "color0")
  colors.addColor(context, "color1")
  colors.addColor(context, "color2")
  colors.addColor(context, "color3")
  colors.addColor(context, "color4")
  colors.addColor(context, "color5")
  gui.add(context, "reset")  
}

export default createControls
