## Discontinued - legacy code for future reference

This subproject of node-rhizome is legacy code, which is not maintained at this point. It serves as a foundation for presentation purposes, as the documentation and concept are not affected by this decision, for the most part and can be reused, as such.


It is a historical milestone in development (regardless), as well as an effort of an individual developer, most notably addressing the following important needs in evolution:


- augmentation layer on top of current database schemas, which often don't address immutable tracking of changes to data state or versioning thereof

- multilingual data schema is often not provided out-of-the-box

- with artificial intelligence getting more influence, research and implementation practices which provide a unified data schema for understanding human behaviour in groups and in turn machine-based decisions, is hidden behind the scenes where users don't have a clear way of understanding and thus influencing it



**Reasoning behind decision to discontinue**


Because of widespread use of Node.js as the web-facing layer in many modern applications and their APIs, this codebase will serve for future reference in development of node-rhizome.


Also, because of supporting possibility of implementation with NoSQL and SQL databases alike, an abstraction of the SQL relation model should be adopted for broader use.


Codebase will be smaller in this manner, leading to lower cost of maintainence and adoption - an important factor (of course, depending on number of active developers).


In case there is a real need and organizations, which would support this PHP branch of node-rhizome, then this decision will have been revisited.



**Node.js modules in active development...**

- [Main node-rhizome package (covered in /main/getNode.php)](github.com/fairshift/node-rhizome)
- [Histographical gesture-reflection package](github.com/fairshift/node-rhizome/tree/master/API node-rhizome (Node.js) [merged%2C conceptual])
- [Leap Gesture protocol - social media implementation of the forementioned (at leap seconds)](facebook.com/santappl)




*Thank you for paying attention! If not earlier, see you on 31st of December, 2028 (Taiwan maybe?)*
