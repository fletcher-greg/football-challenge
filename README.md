# Intructions

- Run `node ./project.js`.
- The code also runs in the browser console (if you don't have node.js)

# State of application

- Prints _Group stage_ and _last 16_ results.
- In the Group stage every team in each group play twice with a random score 0-3 (including the team played against).
- Top 2 teams from each group proceed to Last-16s
- The Last 16 draw is chosen randomly with the following rules. No teams from the same group, no teams from same country, and only winners play runner-ups.

# Thoughts

The code is extremely rough and is more of a mind dump than anything else. Unfortunately, I didn't have enough time to finish it or clean it up. It was an interesting exercise. I tried to apply a functional/declarative style of programming for learning/experimentation.

# Problems Faced

### Not enough data structure planning

Part way through the project, I realized the data structure was incomplete. This held up the process which meant I had to rewrite some logic to make it work up until the last-16s draw.

If I had another go, I would pre-plan the data structure which would make the logic flow much more smoothly.

# Where I would go from here.

- Fix `main` function so that it handles all stages (including the final).
- Add extra rules for teams that are tied. Currently, the away goal is not being used to choose winners.
- Have clearer more composable functions that run each stage with clearer names.
