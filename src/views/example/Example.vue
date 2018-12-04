<template>
  <div id="example">
    <zk-table
      ref="table"
      :data="data"
      :columns="columns"
      :stripe="true"
      :border="true"
      :tree-type="true"
      :expand-type="false"
      :selection-type="false">
      <template slot="likes" slot-scope="scope">
        {{ scope.row.likes.join(',') }}
      </template>
    </zk-table>
  </div>
</template>

<script>
  import Vue from 'vue'
  import ZkTable from 'vue-table-with-tree-grid'
  Vue.use(ZkTable)

  export default {
    name: 'example',
    data() {
      return {
        data: [
          {
            name: 'Jack',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 10,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                    children: [
                      {
                        name: 'Ashley',
                        sex: 'female',
                        likes: ['football', 'basketball'],
                        score: 20,
                      },
                      {
                        name: 'Taki',
                        sex: 'male',
                        likes: ['football', 'basketball'],
                        score: 10,
                        children: [
                          {
                            name: 'Ashley',
                            sex: 'female',
                            likes: ['football', 'basketball'],
                            score: 20,
                          },
                          {
                            name: 'Taki',
                            sex: 'male',
                            likes: ['football', 'basketball'],
                            score: 10,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
                children: [
                  {
                    name: 'Ashley',
                    sex: 'female',
                    likes: ['football', 'basketball'],
                    score: 20,
                  },
                  {
                    name: 'Taki',
                    sex: 'male',
                    likes: ['football', 'basketball'],
                    score: 10,
                  },
                ],
              },
            ],
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
          },
          {
            name: 'Tom',
            sex: 'male',
            likes: ['football', 'basketball'],
            score: 20,
            children: [
              {
                name: 'Ashley',
                sex: 'female',
                likes: ['football', 'basketball'],
                score: 20,
              },
              {
                name: 'Taki',
                sex: 'male',
                likes: ['football', 'basketball'],
                score: 10,
              },
            ],
          },
        ],
        columns: [
          {
            label: 'name',
            prop: 'name',
            width: '400px',
          },
          {
            label: 'sex',
            prop: 'sex',
            minWidth: '50px',
          },
          {
            label: 'score',
            prop: 'score',
          },
          {
            label: 'likes',
            prop: 'likes',
            minWidth: '200px',
            type: 'template',
            template: 'likes',
          }
        ],
      };
    }
  };
</script>

