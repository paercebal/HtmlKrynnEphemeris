# HtmlKrynnEphemeris

A live version can be accessed here: https://www.paercebal.org/HtmlKrynnEphemeris/

![Krynn Ephemeris the Tuesday 3rd September 357 AC](example.00.jpg "Krynn Ephemeris the Tuesday 3rd September 357 AC")

A simple graphic ephemeris for Krynn, which can be used to determine, for any date, the position of the three moons, using both the classic moon phases, or the Taladas moon phases (which I prefer).

## Design Choices

In the math, everything starts at zero, as proper, even if it is "adjusted" later for display. The first year after the Cataclysm is 0 RC (Real Calendar), which is 1 AC. (It just makes calculations easier). -1 RC is thus -1 PC (I keep the minus for clarity's purposes)

So, the only date usable for RPG purpose is the Date field, which gives the full date, from weekday to year. Not only it supports all the local Ansalonian weekdays and months, but it also shows the "AC" and "PC" suffix, as well as "IA" (Istarian Calendar), "EC" (Ergothian Calendar) and "KToL (Kender's Time of Light Calendar).

### Order and Design

According to the official canon, the Krynnish year is 336 days long. The periods of the moons are 36 days for Solinari, 28 days for Lunitari, and 8 days for Nuitari. Fun fact: The period of Lunitari is the same as the Month's length.

Now, let's assume, as the world has been built with order-crazy gods, that everything is ordered, and fall neatly into place. There's no rounding anywhere, no leap days. The years is *exactly* 336 days, and the periods of all moons are *strict integer multiples* of days, too. This leads to a few curiosities: The three moons have an overall cycle of 504 days (which is *exactly* 1.5 year). In other words, every 504 days, the moon reappear in the sky exactly in the same position as 504 days before.

From there, we can do the following extrapolations (that are deemed to be true in my campaign):

First, let's postulate that the 1th January is always a Sunday.

Second, as we need a date for the Night of the Eye, Let's postulate that, we will follow Brothers Majere's guidance (because, why not?):

> “Don’t interrupt me, if you want to know what’s going on. This year’s Festival of the Eye is going to be different from most others because all three moons, including the black moon Nuitari, are moving to rare conjunction. They will form the Great Eye—an orb of red, silver, and black hovering in the night sky, looking down upon Krynn with unfathomable intent.”
>
>Raistlin paused, gazing at his brother with his own golden hourglass eyes.
>
>“This has occurred once before in the history of the world — during the Cataclysm.”
>
>Caramon shook his head. “Look, the Festival of the Eye happens every year. You’ve never been sick before. Except that once.”
>
> --- Brothers Majere, chapter 9.

While Brothers Majere is full of misconceptions about calendars, we can assume the narrator to be unreliable, but for one thing:

> "This has occurred [...] before [...] — during the Cataclysm."

This date is interesting because it was chosen by the Kingpriest for his demand to the gods, so we can assume he might have waited for a very special moment in time. Also, he made his demand during the day, which means the moon were, at this time, on the opposite side of Ansalon, and would only be seen at night, if the sky was clear, which probably wasn't for everyone.

The Cataclysm happens on the 3rd day of the year 1 AC, i.e. Tuesday the 3rd (as described here: https://dragonlance.fandom.com/wiki/Cataclysm). Also, Yule is 10 days before the new year (as described here: https://dragonlance.fandom.com/wiki/0_PC), which means it starts the Thursday 19th of December. (\*)


(\*) *This is contradicted by the Wiki (https://dragonlance.fandom.com/wiki/December), which confirms Yule is the Winter Solstice, but contradicts when it says it happens December 22. This last information will be ignored because it was probably "decided" at a time the Dragonlance designers still used 31-days December months.*

So we can assume every Thursday 19th December is the winter solstice (i.e. the middle of winter). This means every Thursday 19th June is the Summer Solstice, and that every Thursday 19th March is the Spring Equinox, and every Thursday 19th September is the Autumn Equinox.

So we can define our Epoch as Day 0 or year 0 of our Real Calendar as The Sunday 1st of January of 1 AC. Knowing that three days later, we have a Night of the Eye event, we can assume that January the 1st, each moon was then at their phase-day 34 (Solinari), 26 (Lunitari) and 6 (Nuitari).

This thus means that in the 3 september 357 AC of my campaign is "Tuesday 4rd October 357 AC", and that Solinari is waxing, about the become full, while Lunitari and Nuitari are not only at full moon, but also in conjunction.
