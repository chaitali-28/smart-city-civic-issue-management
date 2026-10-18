
const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000;

const normalize = (value = '') =>
  value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

async function verifyDhuleLocation(address) {
  const cleanedAddress = String(address || '').trim();

  if (cleanedAddress.length < 4 || cleanedAddress.length > 500) {
    return {
      valid: false,
      message: 'Enter a more complete location.',
    };
  }

  // Avoid sending obviously meaningless text to the geocoder.
  if (!/[a-zA-Z]/.test(cleanedAddress)) {
    return {
      valid: false,
      message: 'Enter a recognizable village, road, landmark or address.',
    };
  }

  const cacheKey = normalize(cleanedAddress);
  const cached = cache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.result;
  }

  try {
    const params = new URLSearchParams({
      q: `${cleanedAddress}, Dhule district, Maharashtra, India`,
      format: 'jsonv2',
      addressdetails: '1',
      limit: '5',
      countrycodes: 'in',
    });

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      {
        headers: {
          'User-Agent': 'SmartCityCivicProject/1.0',
          'Accept-Language': 'en',
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding service returned ${response.status}`);
    }

    const results = await response.json();

    if (!Array.isArray(results) || results.length === 0) {
      return {
        valid: false,
        message:
          'We could not verify this location. Try adding the village, taluka, or a nearby landmark.',
      };
    }

    // Only accept results explicitly identified as being in Dhule.
    // Do not accept a result simply because the query mentioned Dhule.
    const match = results.find((item) => {
      const a = item.address || {};

      const state = normalize(a.state || '');
      const country = normalize(a.country || '');
      const districtFields = [
        a.state_district,
        a.district,
        a.county,
      ].filter(Boolean);

      const districtMatches = districtFields.some(
        (field) => normalize(field) === 'dhule'
      );

      return (
        state === 'maharashtra' &&
        country === 'india' &&
        districtMatches &&
        Number.isFinite(Number(item.lat)) &&
        Number.isFinite(Number(item.lon))
      );
    });

    if (!match) {
      return {
        valid: false,
        message:
          'We could not confirm that this place is in Dhule district. Enter a more specific village, taluka, road, or landmark.',
      };
    }

    const result = {
      valid: true,
      message: 'Location verified within Dhule district.',
      location: {
        displayName: match.display_name,
        latitude: Number(match.lat),
        longitude: Number(match.lon),
      },
    };

    cache.set(cacheKey, {
      result,
      expiresAt: Date.now() + CACHE_TTL,
    });

    return result;
  } catch (error) {
    console.error('Location verification failed:', error.message);

    return {
      valid: false,
      unavailable: true,
      message:
        'Location verification is temporarily unavailable. Please try again later.',
    };
  }
}

module.exports = { verifyDhuleLocation };
