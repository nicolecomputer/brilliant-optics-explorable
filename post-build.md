## Now that you've had a chance to implement it, are there different features you would have prioritized, knowing what you know now?

I want more time to explore the optics! The [deployed lab](https://brilliant-optics-explorable.nicole.computer/) only has a single bounce for light and is a work-in-progress for multiple mirrors. There is an [experimental branch](https://github.com/nicolecomputer/brilliant-optics-explorable/pull/2) for multiple bounces and mirroring mirrors.

One area that I grappled with throughout this project was the difference between editor state and the data that drives the simulation. For example, it's important to me to be able to lock the axis that an object can move on (or mark it as non-movable), however in the editor I always want objects to be freely movable to setup a desired state. If I was starting over I would prefix events that only matter for the lab with `LAB/` (like `LAB/MIRROR-MOVE`) and editor events with `EDITOR/MIRROR-MOVE`. I would then have a reducer for the editor that included the lab's config as a child reducer.

Testing! The core of this app is setup to be very testable. Especially the optics code should be tested very carefully and validated because it's the heart of the project. It is, intentionally, not mixed up in the UI at all so that it would be very possible to test it.

If I had more time I would also explore mobile. The current canvas size, 500x500, is not optimized for mobile devices. I have, however, made the elements of this lab chunky enough to be picked up with a finger. I think there's something interesting here for mobile devices but it's not quite there. I would also need to register not only mouse events but touch events.

Then there's lots of little-big things that matter - dark mode, keyboard access, focus states for keyboard users, labeling mirrors (like A, B, C) so that it's clear which editor card ties to which mirror.

## How could your interactive be extended to cover more concepts in optics?

This interactive is setup to be very extensible. It was clear to me early on that I would want different kinds of mirrors (horizontal mirrors, vertical mirrors, angled mirrors, curved mirrors) and so the code makes `VerticalMirror` a first class object.

I imagine that mirrors are probably generalizable but I would be hesitant to make a generalized `Mirror` object because as-a-learner the difference matters to me as I build intuition! I have a hunch that that generalization would involve rotating the coordinate system so that it is always entering perpendicular from the perspective of the mirror and that solving the system would be a series of coordinate system rotations and transforms.

It would also be possible to add lenses and lights (point sources, directional sources) to this.

In all cases adding objects would involve extending the reducer, adding new reducer events, and adding new components that derive state from the state of global state. The `src/mirror-lab/optics-components/LightPath.tsx` is a good example of taking in global state, using a standalone function to derive state and then visualizing that state.

## What parts of your interactive could be useful in other areas of STEM? Give a few examples.

The core code in `optics.ts` could definitely be picked up and moved to other places. The editor is general enough that other simulations could be built with it.

The one use case that kept popping up for me is **sound**. The way a photon is being modeled as reflected is a good starting point for sound as well. There's an interesting interactive that shows how sound changes as it encounters objects. The core of that is here and this lab could be extended to make that more apparent.

Ray tracing and computer graphics is also another obvious use-case for this. I would use this lab along with another visualization that shows how a pixel is being rendered.

## Please briefly describe your use of AI to produce the deliverable.

I used AI throughout! I have noted commits that were AI assisted with (🤖) in the git log with notes on how AI was used.

The biggest use case was in `optics.ts`. The AI is almost-solely responsible for the core math in this function and other than fixing up some syntax errors or unused variables it's being used as-is. This was a huge speedup but, if this was a production project, I would be validating this code and math with subject experts to make sure I was correctly capturing the core-ideas. AI stood in for a subject expert.

I used AI to speed up tedious work. I love react+redux. Redux makes it so easy to reason about how state is changing in a system. The downside is that redux is tedious to write out events and types and propagate them through the system. The great thing about redux is that it is very pattern-oriented and AI is great at matching those patterns and adding the next one.
