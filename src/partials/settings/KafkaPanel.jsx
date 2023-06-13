import React, { useState } from 'react';


function KafkaPanel() {

    const [topicName, setTopicName] = useState('');
    const [numPartitions, setNumPartitions] = useState(1);
    const [replicationFactor, setReplicationFactor] = useState(1);
    
    function handleCreate() {
      // Create topic logic here...
      createKafkaTopic(topicName, numPartitions, replicationFactor);
    }

    return (
          <div className='grow'>
                  <div className="p-6 space-y-6">
                    <h2 className="text-2xl text-slate-800 font-bold mb-5">Create Topic Setting</h2>

                    <section>
                        <h2 className="text-xl leading-snug text-slate-800 font-bold mb-1">Business Profile</h2>
                        <div className="text-sm">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.</div>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="sm:w-1/3">
                             <label className="block text-sm font-medium mb-1" htmlFor="name">Topic Name</label>
                            <input id="name" className="form-input w-full" value={topicName} type="text" />
                            </div>
                         </div>
                         <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="sm:w-1/3">
                             <label className="block text-sm font-medium mb-1" htmlFor="name">Number of Partitions</label>
                            <input id="name" className="form-input w-full" value={numPartitions} type="number" />
                            </div>
                         </div>
                         <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="sm:w-1/3">
                             <label className="block text-sm font-medium mb-1" htmlFor="name">Replication Factor</label>
                            <input id="name" className="form-input w-full" value={replicationFactor} type="number" />
                            </div>
                         </div>
                    </section>

                    {/* Panel footer */}
                    <footer>
                        <div className="flex flex-col px-6 py-5 border-t border-slate-200">
                        <div className="flex self-end">
                            <button className="btn border-slate-200 hover:border-slate-300 text-slate-600">Cancel</button>
                            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3">Create Topic</button>
                        </div>
                        </div>
                    </footer>
             {/* <form> */}
                {/* <label>
                    Topic Name: 
                    <input 
                    type="text" 
                    value={topicName}
                    onChange={e => setTopicName(e.target.value)} 
                    />
                </label> */}
                    
                {/* <label>          
                    Number of Partitions:
                    <input 
                    type="number" 
                    value={numPartitions} 
                    onChange={e => setNumPartitions(e.target.value)}          
                    />
                </label>        */}
                    
                {/* <label>
                    Replication Factor:
                    <input
                    type="number" 
                    value={replicationFactor}
                    onChange={e => setReplicationFactor(e.target.value)}
                    />        
                </label> */}
                
                {/* <button onClick={handleCreate}>
                    Create Topic
                </button>      
                </form> */}

                </div>
          </div>
    )
}

export default KafkaPanel;