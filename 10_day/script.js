const input=`0
77
58
25
92
14
154
105
112
147
63
84
109
24
129
49
102
130
128
134
88
95
70
80
4
153
17
145
122
39
117
93
65
3
2
139
101
148
37
27
1
87
64
23
59
42
146
43
151
116
46
115
118
131
94
19
33
12
107
10
7
73
78
53
11
135
79
60
32
141
31
140
98
136
72
38
152
30
74
106
50
13
26
155
67
20
66
91
56
34
125
52
51
18
108
57
81
119
71
144`;
let inputArraySorted=input.split('\n').map(i=>Number(i)).sort((a,b)=>a-b);
	
const resultPartTwo=outer (0,inputArraySorted.slice(1));
function outer (start, a){
	if(a.length===0){
		return 1;

	}

	return loop(0,0);

	function loop(index,acc){
		if((a[index]-start)>=4||!a[index]){
			return acc;
		}
		else if((a[index]-start)<4){
			acc=acc+outer(a[index],a.slice(index+1));
		}
		 return loop(index+1,acc);
	}


}

console.log(resultPartTwo);
