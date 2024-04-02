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


const players = ['Joe', 'Caroline', 'Sabrina'];

players.forEach(player=>{
    luckyDraw(player).then(val=>{
        console.log(val)
    }).catch(err=>{
        console.log(err.message)
    })
})


