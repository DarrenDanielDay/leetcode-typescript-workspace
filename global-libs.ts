/**
 * Copyright (C) 2022  DarrenDanielDay <Darren_Daniel_Day@hotmail.com>
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import lodash from "lodash";
import * as Q from "@datastructures-js/queue";
import {
  MaxPriorityQueue as MaxPQ,
  MinPriorityQueue as MinPQ,
  PriorityQueue as PQ,
} from "@datastructures-js/priority-queue";

declare global {
  var _: typeof lodash;
  var Queue: typeof Q;
  var MaxPriorityQueue: typeof MaxPQ;
  var MinPriorityQueue: typeof MinPQ;
  var PriorityQueue: typeof PQ;
}

// Inject into global context.
Object.assign(globalThis, {
  _: lodash,
  Queue: Q,
  MaxPriorityQueue: MaxPQ,
  MinPriorityQueue: MinPQ,
  PriorityQueue: PQ,
});
