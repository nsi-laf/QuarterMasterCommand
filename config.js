const CONFIG = {
    // Magic Numbers for Ratios
    yields: {
        ovenRefining: 0.72,
        pigIronSmelt: 0.72,
        bloodOreAttract: 0.40,
        granumExtraction: 0.21,
        saburraExtraction: 0.4275,
        calxGrind: 0.2058,
        calxCrush: 0.2160,
        coalFromCalx: 0.1140,
        coalPerCoke: 0.72,
        cokePigIronRatio: 0.0385,
        calxCokeRatio: 0.0715,
        calxBloodRatio: 0.0715
    },
    items: [
        {id: 'granum', name: 'Granum', type: 'raw'}, 
        {id: 'calx', name: 'Calx', type: 'raw'},
        {id: 'saburra', name: 'Saburra', type: 'raw'}, 
        {id: 'water', name: 'Water', type: 'raw'},
        {id: 'sp', name: 'Saburra Pwdr', type: 'int'}, 
        {id: 'cp', name: 'Calx Pwdr', type: 'int'},
        {id: 'coal', name: 'Coal', type: 'int'}, 
        {id: 'coke', name: 'Coke', type: 'int'},
        {id: 'pi', name: 'Pig Iron', type: 'int'}, 
        {id: 'gs', name: 'Grain Steel', type: 'int'}
    ]
};