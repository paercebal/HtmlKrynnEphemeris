# HtmlKrynnEphemeris

A simple graphic ephemeris for Krynn, which can be used to determine, for any date, the position of the three moons, using both the classic moon phases, or the Taladas moon phases (which I prefer).

## Design Choices

Everything starts at zero, as proper. The first year after the Cataclysm is 0 AC. This has no real consequence, unless you are dealing with some important date just after the Cataclysm. The other fields start with zero, but unlike the year, this is not really important.

Also, the only date usable for RPG purpose is the Date field, which gives the full date, from weekday to year. For now, it supports only "AC" and "PC" suffix.

### Order and Design

In particular, it is assumed, as the world has been built with order-crazy gods, that everything is ordered, and fall neatly in place. No 29th february, the moon phases are integer multiples of days, unlike in our Earth, and the year is 336 days long exactly. (Everything until here is canon).

This leads to a few curiosities: The three moons have an overall cycle of 504 days (which is exactly 1.5 year). In other words, every 504 days, the moon reappear in the sky exactly in the same position as 504 days before.

Another curiosity is that the phase of Lunitari always following the day of the Month: If Lunitari is full the 1st of January, it will be full all the 1st days of all the months. Similar cycles can be found with Nuitari (full the 1st day of one of every two months), and Solinari (full the 1st day of one of every nine months).

This can lead to the following extrapolations (that are deemed to be true in my campaign):

Let's assume that every Sunday 1th January is the winter solstice. This means Sunday 1th July is the Summer Solstice, and that the 1st April is the Spring Equinox, and the 1st October is the Autumn Equinox.

Let's then assume that, Sunday 1th January of 0 AC (when the Cataclysm happened), the three moons were full (The Kingpriest chose this date for this very reason), and most probably, during a Night of the Eye. This can be the Epoch of this Calendar (and is, in my campaign).

This thus means that in the 2 september 357 AC of my campaign is "Monday 2nd October 357 AC", and that Solinari and Lunitari are full, while Nuitari is waxing crescent.
