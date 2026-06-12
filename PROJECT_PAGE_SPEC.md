# Project Page Specification

This project page shows the 24-iMec project overview, method figures, aggregate results, and ESC-50 audio examples.

- The page is written in English.
- The title is `Audio-Language-Aligned Clustering for Ego-Noise Separation in Legged Robot Audition`.
- The introduction includes Unitree G1 and Unitree Go1 ego-noise videos.
- The method section includes the ego-noise separator overview, Adapt-DiT architecture, audio-language-aligned clustering, and separator training figures.
- Overall evaluation tables report method-level means by robot and SNR, omit `clean_only`, round displayed values to two decimals, and bold the best value in each robot-SNR metric column.

- Ground truth is an ESC-50 class label.
- Audio examples are balanced across SNRs: 16 samples each for `-6`, `0`, and `+6` dB.
- Each method shows `Correct` or `Wrong` for top-1 class classification.
- Each method shows top-3 predicted classes in rank order.
- The proposed method label is `Ours`.
