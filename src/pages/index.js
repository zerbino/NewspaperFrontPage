
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
  {id: 1, imgSrc: "https://i.imgur.com/Rh3GY8r.png", target: "local"},
  {id: 2, imgSrc: "https://i.imgur.com/WkzWpXe.png", target: "départemental"},
  {id: 3, imgSrc: "https://i.imgur.com/Na15rfm.png", target: "national"},
  ];
  const [manchetteSelected, setManchetteSelected] = useState(0);

  const ventreSrcList = [
    {id: 1, imgSrc:"https://i.imgur.com/yh2iXmm.png", target: "local"},
    {id: 2, imgSrc: "https://i.imgur.com/LGLXIOF.png", target: "départemental"},
    {id: 3, imgSrc: "https://i.imgur.com/LkynANv.png", target: "national"},
  ];
  const [ventreSelected, setVentreSelected] = useState(1);

  const annonceSrcList = [
    {id: 1, imgSrc:"https://i.imgur.com/IH9XZx8.png", target: "local"},
	{id: 2, imgSrc: "https://i.imgur.com/zGTKzEF.png", target: "départemental"},
	{id: 3, imgSrc: "https://i.imgur.com/zwMaZMO.png", target: "national"},
  ];
  const [annonceSelected, setAnnonceSelected] = useState(2);
  
  const sousTribunesDroiteList = [
  {id: 1, imgSrc: "https://i.imgur.com/K3ZS8Vl.png", target: "local"},
  {id: 2, imgSrc: "https://i.imgur.com/H63uwBp.png", target: "local"},
  {id: 3, imgSrc: "https://i.imgur.com/wjWSq2F.png", target: "local"},
  {id: 4, imgSrc: "https://i.imgur.com/TF7qzxR.png", target: "départemental"},
  {id: 5, imgSrc: "https://i.imgur.com/fJ4WF23.png", target: "départemental"},
  {id: 6, imgSrc: "https://i.imgur.com/wgck6DL.png", target: "départemental"},
  {id: 7, imgSrc: "https://i.imgur.com/SG2D0Yv.png", target: "national"},
  {id: 8, imgSrc: "https://i.imgur.com/O8P6ynI.png", target: "national"},
  {id: 9, imgSrc: "https://i.imgur.com/ioektDu.png", target: "national"},
  ];
  
  const [sousTribunesDroiteSelectedIndex, setSousTribunesDroiteSelectedIndex] = useState([0, 4, 8]);
  
  const sousTribunesBandeauList = [
    {id: 1, imgSrc: "https://i.imgur.com/CRalEfM.png", target: "local"},
    {id: 2, imgSrc: "https://i.imgur.com/z4kr7vm.png", target: "local"},
    {id: 3, imgSrc: "https://i.imgur.com/s87Ejp6.png", target: "départemental"},
    {id: 4, imgSrc: "https://i.imgur.com/aOR4zT2.png", target: "départemental"},
    {id: 5, imgSrc: "https://i.imgur.com/AeRGQTh.png", target: "national"},
    {id: 6, imgSrc: "https://i.imgur.com/Xg8tVLi.png", target: "national"},
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
