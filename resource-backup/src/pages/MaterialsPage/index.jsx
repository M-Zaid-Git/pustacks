import { NavBar, MaterialIntro, MaterialCard, SearchBar, Footer, BackToTop } from '../../components';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cardData from '../../config/CardData.mjs';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const { category } = useParams();
  let categoryid = -1;

  // Find the category ID based on URL parameters
  cardData.map((value) => {
    if (value.urlparams == category) {
      categoryid = value.id;
    }
  });

  if (categoryid != -1) {
    const categoryimage = cardData[categoryid - 1].background;
    
    // 🌟 FIX APPLIED HERE 🌟
    const fetchmaterials = async () => {
      try {
        // 1. Get the base API link (e.g., '/api/v1/getBooks')
        const baseUrl = cardData[categoryid - 1].fetchlink; 
        
        // 2. Generate a unique cache-buster (timestamp)
        const cacheBuster = new Date().getTime(); 
        
        // 3. Construct the final URL with the cache-buster
        const finalFetchUrl = `${baseUrl}?v=${cacheBuster}`; 

        // 4. Fetch data using the unique URL
        const response = await fetch(finalFetchUrl);
        
        const rdata = await response.json();
        setMaterials(rdata);
      } catch (error) {
        console.log("Error fetching materials data, possibly due to API issues:", error);
      }
    };

    useEffect(() => {
      fetchmaterials();
    }, [categoryid]); // Dependency added to re-run fetch if category changes

    return (
      <>
        <div className="h-[15vh]" />
        <NavBar />
        <MaterialIntro image={categoryimage} length={materials.length} category={cardData[categoryid - 1].domain} />
        <SearchBar />
        {materials.slice(0, 5).map((material) => (
          <MaterialCard material={material} key={material.id} id={material.id} />
        ))}
        <Footer />
        <BackToTop />
      </>
    );
  }
  return (
    <>
      <div>
        <h1>404 Not Found</h1>
      </div>
    </>
  );
};

export default MaterialsPage;
