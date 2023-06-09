// Example of using API4AI people background removal.

// Use 'demo' mode just to try api4ai for free. Free demo is rate limited.
// For more details visit:
//   https://api4.ai

// Use 'rapidapi' if you want to try api4ai via RapidAPI marketplace.
// For more details visit:
//   https://rapidapi.com/api4ai-api4ai-default/api/people-photo-background-removal/details
const MODE = 'demo'

// Your RapidAPI key. Fill this variable with the proper value if you want
// to try api4ai via RapidAPI marketplace.
const RAPIDAPI_KEY = ''

// Processing mode influences returned result. Supported values are:
// * fg-image - Foreground image.
// * fg-mask - Mask image.
const RESULT_MODE = 'fg-image'

const OPTIONS = {
  demo: {
    url: `https://demo.api4ai.cloud/img-bg-removal/v1/people/results?mode=${RESULT_MODE}`,
    headers: { 'A4A-CLIENT-APP-ID': 'sample' }
  },
  rapidapi: {
    url: `https://people-photo-background-removal.p.rapidapi.com/v1/results?mode=${RESULT_MODE}`,
    headers: { 'X-RapidAPI-Key': RAPIDAPI_KEY }
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  const input = document.getElementById('file')
  const resultImage = document.getElementById('result-image')
  const sectionParsed = document.getElementById('sectionParsed')
  const spinner = document.getElementById('spinner')

  input.addEventListener('change', (event) => {
    const file = event.target.files[0]
    if (!file) {
      return false
    }

    sectionParsed.hidden = true
    spinner.hidden = false

    // Preapare request: form.
    const form = new FormData()
    form.append('image', file)

    // Make request.
    // eslint-disable-next-line  no-undef -- $ (jquery) appended to the html file via cdn.
    $.ajax({
      type: 'POST',
      url: OPTIONS[MODE].url,
      data: form,
      headers: OPTIONS[MODE].headers,
      processData: false,
      contentType: false
    })
      .done(function (response) {
        // Parse response and show result image.
        const imgBase64 = response.results[0].entities[0].image
        resultImage.src = 'data:image/png;base64,' + imgBase64
        sectionParsed.hidden = false
      })
      .fail(function (error) {
        // Error can be handled here.
        console.error(error)
      })
      .always(function () {
        spinner.hidden = true
      })
  })
})
