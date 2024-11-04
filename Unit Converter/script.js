function performConversion() {
  // Get the input values
  const value = parseFloat(document.getElementById("value").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  let result;

  // Conversion factors
  const conversionFactors = {
    cups: { ml: 236.588, "fl oz": 8, tbsp: 16, tsp: 48, g: 236.588 },
    ml: { cups: 0.0042, "fl oz": 0.0338, tbsp: 0.0671, tsp: 0.2029, g: 1 },
    "fl oz": { cups: 0.125, ml: 29.5735, tbsp: 2, tsp: 6 },
    tbsp: { cups: 0.0625, ml: 14.7868, "fl oz": 0.5, tsp: 3, g: 14.7868 },
    tsp: { cups: 0.0208, ml: 4.9289, "fl oz": 0.1667, tbsp: 0.3333, g: 4.9289 },
    oz: { g: 28.3495, lb: 0.0625 },
    g: { oz: 0.0353, lb: 0.0022, kg: 0.001 },
    lb: { oz: 16, g: 453.592, kg: 0.454 },
    kg: { g: 1000, lb: 2.2046 },
    F: { C: ((value - 32) * 5) / 9 },
    C: { F: (value * 9) / 5 + 32 },
  };

  // Perform the conversion
  if (fromUnit === toUnit) {
    result = value;
  } else if ((fromUnit === "F" && toUnit === "C") || (fromUnit === "C" && toUnit === "F")) {
    // temperature conversions
    result = conversionFactors[fromUnit][toUnit](value);
  } else if (conversionFactors[fromUnit][toUnit]) {
    // standard unit conversions
    result = value * conversionFactors[fromUnit][toUnit];
  } else {
    // unsupported conversions
    result = "Unsupported conversion";
  }

  // Display the result
  document.getElementById("result").textContent = typeof result === "number" ? `${value} ${fromUnit} = ${result.toFixed(2)} ${toUnit}` : result;

  // display the equivalent measurement in a different unit
  const equivalentUnit = document.getElementById("equivalentUnit").value;
  if (equivalentUnit !== fromUnit && equivalentUnit !== toUnit) {
    const equivalentValue = value * conversionFactors[fromUnit][equivalentUnit];
    document.getElementById("equivalentResult").textContent = `${value} ${fromUnit} = ${equivalentValue.toFixed(2)} ${equivalentUnit}`;
  } else {
    document.getElementById("equivalentResult").textContent = "";
  }
}

// Load the conversion history from localStorage
const history = JSON.parse(localStorage.getItem("conversionHistory")) || [];

// Add event listener to the form
const form = document.getElementById("converterForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  performConversion();
});
