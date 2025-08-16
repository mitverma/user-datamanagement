// Patch for Firebase AggregateQuerySnapshot mismatch
declare module 'rxfire/firestore/lite/interfaces' {
    import { AggregateQuerySnapshot } from 'firebase/firestore';
  
    export type CountSnapshot<T = any> = AggregateQuerySnapshot<T>;
  }
  