# 2018hackathon
2018 UBS Hackathon Project

Build a framework to submit and store data in free style to support daily morning check activities. 

As developer, we have various checks daily to make sure different sytems are in healthy status. If not, we should be able to pick up the issues quickly and respond. Because the checks are hard to predict and formalize, it is important to support data in any "form". The key is knowing whether the system is OK (green), Caution(yellow) or Error(red). The data assiocated with the "event" is in json format that can be used in later issue investigation.

# Project Structure
* [morningcheck](morningcheck/README.md) - WebAPI
* [gui](gui/README.md) - User Interface
* [agents](agents/README.md) - Example scripts for data upload