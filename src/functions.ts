export const useAwaitPoll = (conditionFn:() => any, resolvFn:(fn: () => any) =>  any) => {
   console.log('Await poll init')
   const awaitPoll = setInterval(() => {
      console.log('Waiting...');
      if (conditionFn()) {
         clearInterval(awaitPoll);
         console.log('Success!');
         console.log('Result: ', conditionFn());
         resolvFn(conditionFn());
      }
   }, 1000);
};