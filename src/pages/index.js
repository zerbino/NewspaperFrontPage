
import { useState } from "react";

function SousTribune({ sousTribunesList, sousTribuneSelectedIndex, nextSousTribuneElement, className }) {
	
  function sousTribuneClicked() {
	nextSousTribuneElement();
  }	  
	
  return (
    <div className={className}>
      <img src={sousTribunesList[sousTribuneSelectedIndex].imgSrc} onClick={sousTribuneClicked} />
    </div>
  );
}

function SousTribunes({setSousTribunesSelectedIndex, sousTribunesSelectedIndex, sousTribunesList, className}) {

  function nextSousTribuneElement(sousTribuneNumber) {
	  const previousSelectedElementIndex = sousTribunesSelectedIndex[sousTribuneNumber];
	  let nextSelectedElementIndex = previousSelectedElementIndex;
	  let iteration = 0;
	  while(iteration < sousTribunesList.length - 1 && nextSelectedElementIndex == previousSelectedElementIndex) {
		const nextSelectedElementIndexProposal = (previousSelectedElementIndex + iteration + 1) % sousTribunesList.length;
		if (!(sousTribunesSelectedIndex.includes(nextSelectedElementIndexProposal))) {
			nextSelectedElementIndex = nextSelectedElementIndexProposal; 
		}
		iteration ++;
	  }
	  
	  const nextSoustribunesSelectedIndex = sousTribunesSelectedIndex.slice();
	  nextSoustribunesSelectedIndex[sousTribuneNumber] = nextSelectedElementIndex;
	  setSousTribunesSelectedIndex(nextSoustribunesSelectedIndex);
  }
  
  const sousTribunes = sousTribunesSelectedIndex.map((sousTribuneSelectedIndex, index) => (
	<SousTribune
	  key={index} 
	  className={className}
	  sousTribunesList={sousTribunesList} 
	  sousTribuneSelectedIndex={sousTribunesSelectedIndex[index]}
	  nextSousTribuneElement={() => nextSousTribuneElement(index)}
	  />
  ));
	
  if (className == "sous-tribune") {
	return ( 
    <div class="sous-tribune-container">
		{sousTribunes}
    </div>
	)
  }
  else {
	  return (
		  <>
		  {sousTribunes}
		  </>
	  );
  }
  
}

function SimpleClickableJournalEl({
  imgElList,
  className,
  setImgSelected,
  imgSelected,
}) {
  const imgSrc = imgElList[imgSelected].imgSrc;

  const onElementClicked = () => {
    setImgSelected((imgSelected + 1) % imgElList.length);
  };

  return (
    <div className={className} onClick={onElementClicked}>
      <img src={imgSrc} />
    </div>
  );
}

export default function Journal() {
  const manchettesElList = [
  {id: 1, imgSrc: "https://i.imgur.com/UKOmCTi.jpeg", target: "local"},
  {id: 2, imgSrc: "https://i.imgur.com/l9K2Mdu.jpeg", target: "départemental"},
  ];
  const [manchetteSelected, setManchetteSelected] = useState(0);

  const ventreSrcList = [
    {id: 1, imgSrc:"https://i.imgur.com/sNwoaL7.jpeg", target: "local"},
    {id: 2, imgSrc: "https://i.imgur.com/QuRml3n.jpeg", target: "départemental"},
  ];
  const [ventreSelected, setVentreSelected] = useState(0);

  const annonceSrcList = [
    {id: 1, imgSrc:"https://i.imgur.com/siNMU6u.jpeg", target: "local"},
	{id: 2, imgSrc: "https://i.imgur.com/BMH6Pn9.jpeg", target: "départemental"},
  ];
  const [annonceSelected, setAnnonceSelected] = useState(0);
  
  const sousTribunesDroiteList = [
  {id: 1, imgSrc: "https://i.imgur.com/NpWi5M0.jpeg", target: "local"},
  {id: 2, imgSrc: "https://i.imgur.com/QDfSOv8.jpeg", target: "local"},
  {id: 3, imgSrc: "https://i.imgur.com/d14qWiu.jpeg", target: "local"},
  {id: 4, imgSrc: "https://i.imgur.com/Gjv406r.jpeg", target: "départemental"},
  {id: 5, imgSrc: "https://i.imgur.com/M7xZCut.jpeg", target: "départemental"},
  {id: 6, imgSrc: "https://i.imgur.com/GtcXCCO.jpeg", target: "départemental"},
  ];
  
  const [sousTribunesDroiteSelectedIndex, setSousTribunesDroiteSelectedIndex] = useState([0, 1, 2]);
  
  const sousTribunesBandeauList = [
    {id: 1, imgSrc: "https://i.imgur.com/SLMgYis.jpeg", target: "local"},
    {id: 2, imgSrc: "https://i.imgur.com/JKZaV6z.jpeg", target: "local"},
    {id: 3, imgSrc: "https://i.imgur.com/CFYskfA.jpeg", target: "départemental"},
    {id: 4, imgSrc: "https://i.imgur.com/Esj95IB.jpeg", target: "départemental"},
  ];
  
  const [sousTribunesBandeauSelectedIndex, setSousTribunesBandeauSelectedIndex] = useState([0, 1]);

  return (
    <div class="page">
      <div class="article-container">
        <SousTribunes 
		  className="demi-bandeau"
		  sousTribunesSelectedIndex={sousTribunesBandeauSelectedIndex}
		  setSousTribunesSelectedIndex={setSousTribunesBandeauSelectedIndex}
		  sousTribunesList={sousTribunesBandeauList}
		  />
        <SimpleClickableJournalEl
          imgElList={manchettesElList}
          imgSelected={manchetteSelected}
          setImgSelected={setManchetteSelected}
          className="manchette"
        />
        <SimpleClickableJournalEl
          className="ventre"
          imgElList={ventreSrcList}
          imgSelected={ventreSelected}
          setImgSelected={setVentreSelected}
        />
        <SousTribunes 
		  className="sous-tribune"
		  sousTribunesSelectedIndex={sousTribunesDroiteSelectedIndex}
		  setSousTribunesSelectedIndex={setSousTribunesDroiteSelectedIndex}
		  sousTribunesList={sousTribunesDroiteList}
		  />
        <SimpleClickableJournalEl
          className="annonce"
          imgElList={annonceSrcList}
          imgSelected={annonceSelected}
          setImgSelected={setAnnonceSelected}
        />
      </div>
    </div>
  );
}
