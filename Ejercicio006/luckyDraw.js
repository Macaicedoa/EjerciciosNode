function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }


// const players = ['Joe', 'Caroline', 'Sabrina'];

// players.forEach(player=>{
//     luckyDraw(player).then(val=>{
//         console.log(val)
//     }).catch(err=>{
//         console.log(err.message)
//     })
// })


async function getResults() {
    const players = ['Tina', 'Jorge', 'Julien'];
  
    for (let i=0;i<players.length;i++) {    //No puedo usar un foreach porque el await requiere de una funcion async 
      try {
        const result = await luckyDraw(players[i]);
        console.log(result);
      } catch (error) {
        console.error(error.message);
      }
    }
  }
  getResults();