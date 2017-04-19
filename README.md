# Iocaine7

This is a javascript port of python Iocaine7

Iocaine Powder is a heuristically designed compilation of strategies and meta-strategies,
entered in Darse Billings' excellent First International RoShamBo Programming Competition.
You may use its source code freely; I ask only that you give me credit for any derived works.
I attempt here to explain how it works.

#### Meta-Strategy

RoShamBo strategies attempt to predict what the opponent will do. Given a successful
prediction, it is easy to defeat the opponent (if you know they will play rock, you play
paper). However, straightforward prediction will often fail; the opponent may not be
vulnerable to prediction, or worse, they might have anticipated your predictive logic and
played accordingly. Iocaine Powder's meta-strategy expands any predictive algorithm P into
six possible strategies:

P.0: naive application Assume the opponent is vulnerable to prediction by P; predict their
next move, and play to beat it. If P predicts your opponent will play rock, play paper to
cover rock. This is the obvious application of P.

P.1: defeat second-guessing Assume the opponent thinks you will use P.0. If P predicts rock,
P.0 would play paper to cover rock, but the opponent could anticipate this move and play
scissors to cut paper. Instead, you play rock to dull scissors.

P.2: defeat triple-guessing Assume the opponent thinks you will use P.1. Your opponent thinks
you will play rock to dull the scissors they would have played to cut the paper you would
have played to cover the rock P would have predicted, so they will play paper to cover your
rock. But you one-up them, playing scissors to cut their paper.

At this point, you should be getting weary of the endless chain. "We could second-guess each
other forever," you say. But no; because of the nature of RoShamBo, P.3 recommends you play
paper -- just like P.0! So we're only left with these three strategies, each of which will
suggest a different alternative. (This may not seem useful to you, but have patience.)

P'.0: second-guess the opponent This strategy assumes the opponent uses P themselves against
you. Modify P (if necessary) to exchange the position of you and your opponent. If P'
predicts that you will play rock, you would expect your opponent to play paper, but instead
you play scissors.

P'.1, P'.2: variations on a theme As with P.1 and P.2, these represent "rotations" of the
basic idea, designed to counteract your opponent's second-guessing.

So, for even a single predictive algorithm P, we now have six possible strategies. One of
them may be correct -- but that's little more useful than saying "one of rock, scissors, or
paper will be the correct next move". We need a meta-strategy to decide between these six
strategies.

Iocaine Powder's basic meta-strategy is simple: Use past performance to judge future results.

The basic assumption made by this meta-strategy is that an opponent will not quickly vary
their strategy. Either they will play some predictive algorithm P, or they will play to
defeat it, or use some level of second-guessing; but whatever they do, they will do it
consistently. To take advantage of this (assumed) predictability, at every round Iocaine
Powder measures how well each of the strategies under consideration (six for every predictive
algorithm!) would have done, if it had played them. It assigns each one a score, using the
standard scoring scheme used by the tournament: +1 point if the strategy would have won the
hand, -1 if it would have lost, 0 if it would have drawn.

Then, to actually choose a move, Iocaine Powder simply picks the strategy variant with the
highest score to date.

The end result is that, for any given predictive technique, we will beat any contestant that
would be beaten by the technique, any contestant using the technique directly, and any
contestant designed to defeat the technique directly.

#### Strategies

All the meta-strategy in the world isn't useful without some predictive algorithms. Iocaine
Powder uses three predictors:

Random guess This "predictor" simply chooses a move at random. I include this algorithm as a
hedge; if someone is actually able to predict and defeat Iocaine Powder with any regularity,
before long the random predictor will be ranked with the highest score (since nobody can
defeat random!). At that point, the meta-strategy will ensure that the program "cuts its
losses" and starts playing randomly to avoid a devastating loss. (Thanks to Jesse Rosenstock
for discovering the necessity of such a hedge.)

Frequency analysis The frequency analyzer looks at the opponent's history, finds the move
they have made most frequently in the past, and predicts that they will choose it. While this
scores a resounding defeat again "Good Ole Rock", it isn't very useful against more
sophisticated opponents (which are usually quite symmetrical). I include it mostly to defeat
other competitors which use it as a predictive algorithm.

History matching This is easily the strongest predictor in Iocaine Powder's arsenal, and
variants of this technique are widely used in other strong entries. The version in Iocaine
Powder looks for a sequence in the past matching the last few moves. For example, if in the
last three moves, we played paper against rock, scissors against scissors, and scissors
against rock, the predictor will look for times in the past when the same three moves
occurred. (In fact, it looks for the longest match to recent history; a repeat of the last 30
moves is considered better than just the last 3 moves.) Once such a repeat is located, the
history matcher examines the move our opponent made afterwards, and assumes they will make it
again. (Thanks to Rudi Cilibrasi for introducing me to this algorithm, long ago.)

Once history is established, this predictor easily defeats many weak contestants. Perhaps
more importantly, the application of meta-strategy allows Iocaine to outguess other strong
opponents.

#### Details

If you look at Iocaine Powder's source code, you'll discover additional features which I
haven't treated in this simplified explanation. For example, the strategy arsenal includes
several variations of frequency analysis and history matching, each of which looks at a
different amount of history; in some cases, prediction using the last 5 moves is superior to
prediction using the last 500. We run each algorithm with history sizes of 1000, 100, 10, 5,
2, and 1, and use the general meta-strategy to figure out which one does best.

In fact, Iocaine even varies the horizon of its meta-strategy analyzer! Strategies are
compared over the last 1000, 100, 10, 5, 2, and 1 moves, and a meta-meta-strategy decides
which meta-strategy to use (based on which picker performed best over the total history of
the game). This was designed to defeat contestants which switch strategy, and to outfox
variants of the simpler, older version of Iocaine Powder.

---
#### Iocaine7 Version ported to JavaScript by Deepak Jacob
---

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---
Following orginal license from python version
---

Copyright (c) 2011 Jonathan Burdge

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
