
import { useState } from "react";

function SousTribuneDroite({ sousTribunesDroiteList, sousTribuneDroiteSelectedIndex, nextSousTribuneElement }) {
	
  function sousTribuneClicked() {
	nextSousTribuneElement();
  }	  
	
  return (
    <div class="sous-tribune">
      <img src={sousTribunesDroiteList[sousTribuneDroiteSelectedIndex].imgSrc} onClick={sousTribuneClicked} />
    </div>
  );
}

function SousTribunesDroite({setSousTribunesDroiteSelectedIndex, sousTribunesDroiteSelectedIndex, sousTribunesDroiteList}) {

  function nextSousTribuneElement(sousTribuneNumber) {
	  const previousSelectedElementIndex = sousTribunesDroiteSelectedIndex[sousTribuneNumber];
	  let nextSelectedElementIndex = previousSelectedElementIndex;
	  let iteration = 0;
	  while(iteration < sousTribunesDroiteList.length - 1 && nextSelectedElementIndex == previousSelectedElementIndex) {
		const nextSelectedElementIndexProposal = (previousSelectedElementIndex + iteration + 1) % sousTribunesDroiteList.length;
		if (!(sousTribunesDroiteSelectedIndex.includes(nextSelectedElementIndexProposal))) {
			nextSelectedElementIndex = nextSelectedElementIndexProposal; 
		}
		iteration ++;
	  }
	  
	  const nextSoustribunesDroiteSelectedIndex = sousTribunesDroiteSelectedIndex.slice();
	  nextSoustribunesDroiteSelectedIndex[sousTribuneNumber] = nextSelectedElementIndex;
	  setSousTribunesDroiteSelectedIndex(nextSoustribunesDroiteSelectedIndex);
  }
	
  return (
    <div class="sous-tribune-container">
      <SousTribuneDroite key={0} 
	  sousTribunesDroiteList={sousTribunesDroiteList} 
	  sousTribuneDroiteSelectedIndex={sousTribunesDroiteSelectedIndex[0]}
	  nextSousTribuneElement={() => nextSousTribuneElement(0)}
	  />
      <SousTribuneDroite key={1} 
	  sousTribunesDroiteList={sousTribunesDroiteList} 
	  sousTribuneDroiteSelectedIndex={sousTribunesDroiteSelectedIndex[1]}
	  nextSousTribuneElement={() => nextSousTribuneElement(1)}
	  /> 
	   <SousTribuneDroite key={2}
	  sousTribunesDroiteList={sousTribunesDroiteList} 
	  sousTribuneDroiteSelectedIndex={sousTribunesDroiteSelectedIndex[2]}
	  nextSousTribuneElement={() => nextSousTribuneElement(2)}
	  /> 
    </div>
  );
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

function SousTribuneBandeau({ imgSrc }) {
  return (
    <div class="demi-bandeau">
      <img src={imgSrc} />
    </div>
  );
}

function SousTribunesBandeau() {
  return (
    <>
      <SousTribuneBandeau imgSrc="https://i.imgur.com/SLMgYis.jpeg" />
      <SousTribuneBandeau imgSrc="https://i.imgur.com/JKZaV6z.jpeg" />
    </>
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
  ]
  
  const [sousTribunesDroiteSelectedIndex, setSousTribunesDroiteSelectedIndex] = useState([0, 1, 2]);

  return (
    <div class="page">
      <div class="article-container">
        <SousTribunesBandeau/>
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
        <SousTribunesDroite 
		  sousTribunesDroiteSelectedIndex={sousTribunesDroiteSelectedIndex}
		  setSousTribunesDroiteSelectedIndex={setSousTribunesDroiteSelectedIndex}
		  sousTribunesDroiteList={sousTribunesDroiteList}
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
