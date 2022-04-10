const getLocationCoordinates = async (req, res) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.body.location}.json?country=co&limit=10&types=place%2Caddress%2Cpoi&language=es&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCES_TOKEN}`

    try {
      const response = await fetch(mapboxUrl)
      const data = await response.json()
     // console.log(data.features[0].center)
      
  
      res.status(200).send({ message: 'success', data: data.features[0].center })
    } catch (error) {
      res.status(500).send({ message: 'error', data: error.message })
    }
  }

  export default getLocationCoordinates