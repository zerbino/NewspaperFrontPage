
import { useState } from "react";


function ValidationPanel({gameStage, setGameStage}) {
	return (
		<div className="validation-panel">
			<PublishButton gameStage={gameStage} setGameStage={setGameStage}/>
		</div>
	)
}

function PublishButton({gameStage, setGameStage}) {
	
	function publish() {
		setGameStage();
	}
	
	return <button className="publish-button" onClick={publish}>Publier !</button>
}

function SousTribune({ sousTribunesList, sousTribuneSelectedIndex, nextSousTribuneElement, className, gameStage }) {
	
  function sousTribuneClicked() {
	nextSousTribuneElement();
  }	  
	
  return (
    <div className={className}>
      <img src={sousTribunesList[sousTribuneSelectedIndex].imgSrc} onClick={sousTribuneClicked} />
    </div>
  );
}

function SousTribunes({setSousTribunesSelectedIndex, sousTribunesSelectedIndex, 
sousTribunesList, className, gameStage}) {

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
	  gameStage={gameStage}
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
  gameStage

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
  /* represents at which state of the game the user's at : MODIFYING (the first page of the journal) or
  * VALIDATED (the first page)
  */
  const [gameStage, setGameStage] = useState("MODIFYING");
	
  const manchettesElList = [
  {id: 1, imgSrc: "https://i.imgur.com/LLTMG8o.png", target: "local"},
  {id: 2, imgSrc: "https://i.imgur.com/BgBxrBH.png", target: "départemental"},
  {id: 3, imgSrc: "https://i.imgur.com/Cs5wCqh.jpeg", target: "national"},
  ];
  const [manchetteSelected, setManchetteSelected] = useState(0);

  const ventreSrcList = [
    {id: 1, imgSrc:"https://i.imgur.com/26L1dWi.png", target: "local"},
    {id: 2, imgSrc: "https://i.imgur.com/qjjJgbF.png", target: "départemental"},
    {id: 3, imgSrc: "https://i.imgur.com/VK6Qun4.png", target: "national"},
  ];
  const [ventreSelected, setVentreSelected] = useState(1);

  const annonceSrcList = [
    {id: 1, imgSrc:"https://i.imgur.com/IH9XZx8.png", target: "local"},
	{id: 2, imgSrc: "https://i.imgur.com/wvBaU5N.png", target: "départemental"},
	{id: 3, imgSrc: "https://i.imgur.com/zwMaZMO.png", target: "national"},
  ];
  const [annonceSelected, setAnnonceSelected] = useState(2);
  
  const sousTribunesDroiteList = [
  {id: 1, imgSrc: "https://i.imgur.com/me9FZMW.png", target: "local"},
  {id: 2, imgSrc: "https://i.imgur.com/EleFqoT.png", target: "local"},
  {id: 3, imgSrc: "https://i.imgur.com/0prT2E3.png", target: "local"},
  {id: 4, imgSrc: "https://i.imgur.com/DUSNEPh.png", target: "départemental"},
  {id: 5, imgSrc: "https://i.imgur.com/IwZT67O.png", target: "départemental"},
  {id: 6, imgSrc: "https://i.imgur.com/NY74OXz.png", target: "départemental"},
  {id: 7, imgSrc: "https://i.imgur.com/ls7vHeM.png", target: "national"},
  {id: 8, imgSrc: "https://i.imgur.com/qaWG8NI.png", target: "national"},
  {id: 9, imgSrc: "https://i.imgur.com/j7A5Hrt.png", target: "national"},
  ];
  
  const [sousTribunesDroiteSelectedIndex, setSousTribunesDroiteSelectedIndex] = useState([0, 4, 8]);
  
  const sousTribunesBandeauList = [
    {id: 1, imgSrc: "https://i.imgur.com/uIx4dO5.png", target: "local"},
    {id: 2, imgSrc: "https://i.imgur.com/AUJBwKl.png", target: "local"},
    {id: 3, imgSrc: "https://i.imgur.com/M0RKBHK.png", target: "départemental"},
    {id: 4, imgSrc: "https://i.imgur.com/W2JDJ6B.png", target: "départemental"},
    {id: 5, imgSrc: "https://i.imgur.com/dnzr0il.png", target: "national"},
    {id: 6, imgSrc: "https://i.imgur.com/URQoRhy.png", target: "national"},
  ];
  
  const [sousTribunesBandeauSelectedIndex, setSousTribunesBandeauSelectedIndex] = useState([3, 4]);
  
  function getPageClassName (gameStageVal) {
	  return gameStageVal.toLowerCase();
  }

  return (
    <div className={`page ${getPageClassName(gameStage)}`}>
      <div className="article-container">
        <SousTribunes 
		  className="demi-bandeau"
		  gameStage={gameStage}
		  sousTribunesSelectedIndex={sousTribunesBandeauSelectedIndex}
		  setSousTribunesSelectedIndex={setSousTribunesBandeauSelectedIndex}
		  sousTribunesList={sousTribunesBandeauList}
		  />
        <SimpleClickableJournalEl
		  gameStage={gameStage}
          imgElList={manchettesElList}
          imgSelected={manchetteSelected}
          setImgSelected={setManchetteSelected}
          className="manchette"
        />
        <SimpleClickableJournalEl
          className="ventre"
		  gameStage={gameStage}
          imgElList={ventreSrcList}
          imgSelected={ventreSelected}
          setImgSelected={setVentreSelected}
        />
        <SousTribunes 
		  className="sous-tribune"
		  gameStage={gameStage}
		  sousTribunesSelectedIndex={sousTribunesDroiteSelectedIndex}
		  setSousTribunesSelectedIndex={setSousTribunesDroiteSelectedIndex}
		  sousTribunesList={sousTribunesDroiteList}
		  />
        <SimpleClickableJournalEl
          className="annonce"
		  gameStage={gameStage}
          imgElList={annonceSrcList}
          imgSelected={annonceSelected}
          setImgSelected={setAnnonceSelected}
        />
      </div>
	  <ValidationPanel gameStage={gameStage} setGameStage={() => setGameStage("VALIDATED")}/>
    </div>
  );
}
