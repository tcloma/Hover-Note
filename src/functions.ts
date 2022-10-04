export const useAwaitPoll = (conditionFn: any, resolvFn: any) => {
   console.log('Await init ⌛');
   const awaitPoll = setInterval(() => {
      console.log('Waiting...');
      if (conditionFn()) {
         clearInterval(awaitPoll);
         resolvFn(conditionFn());
      }
   }, 300);
};
