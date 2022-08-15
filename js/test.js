let func = (i) => {
    return (done, wait) => {
      setTimeout(() => {
        console.log(i);
        done()
      }, wait);
    }
  }
  
  async function start(num) {
    for 
    await func(num)
  
  }
  
  start(10)