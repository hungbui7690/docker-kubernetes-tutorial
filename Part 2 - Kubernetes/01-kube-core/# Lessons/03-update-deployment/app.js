/*
  Updating Deployments
  - update code -> <p>This is NEW</p>
  - docker build -t kube-first-app .
  - docker push hungbui7690/kube-first-app


+++++++++++++

  @ now, we want to update the deployment
    - kubectl set image deployment/first-app kube-first-app=hungbui7690/kube-first-app
    - kubectl get pods 
      # there's no difference between the pod before and after the update
    ❌ if we go to / -> no change
    ❌ reason: if we want to update -> need to update the tag of the image


  @ docker build -t kube-first-app:1 .
    - docker push hungbui7690/kube-first-app:1
    - kubectl <set> <image> <deployment/first-app> <kube-first-app>=hungbui7690/kube-first-app:1
      # kube use the rollout strategy to update the deployment
      # will not shutdown the current pod -> but create the new pod and apply update there -> then replace the old pod with the new pod
    - kubectl <rollout> <status> deployment/first-app
      -> check the status of the rollout (rollout: official launch/introduce a new product)


  @ there are more rollout commands: 
    # kubectl <rollout> <undo> deployment/abc -> rollback to previous version
    # kubectl <rollout> <restart> deployment/abc -> restart a deployment


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Deployment Rollbacks & History
  - if we update the builds that does not exist, like below
    # kubectl set image deployment/first-app kube-first-app=hungbui7690/kube-first-app:<xyz>
      -> error -> but our website will not shutdown -> since kube still use the old good image
  - kubectl <rollout> <status> deployment/first-app
    # will hang here 
    # check dashboard -> will see the error appears
  - kubectl get pods
    -> will see 1 more pod


+++++++++++++++++++

  @ Rollback
  - We can rollback to the previous version
    # kubectl <rollout> <undo> deployment/first-app
    # kubectl <rollout> <status> deployment/first-app


+++++++++++++++++++

  @ History
  - kubectl <rollout> <history> deployment/first-app
  - kubectl <rollout> <history> deployment/first-app --revision=1
    # view details of the revision


+++++++++++++++++++

  @ Rollback to Specific Revision
  - kubectl <rollout> <undo> deployment/first-app --to-revision=1


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Clean Out
  - kubectl <delete> <service> first-app
  - kubectl <delete> <deployment> first-app
    # need to wait for pods to be deleted

  🧵 We finished the "imperative" approach
    -> Next, we will work on the "imperative" approach




*/

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello from this NodeJS app!</h1>
    <p>This is NEW</p>
    <p>Try sending a request to /error and see what happens</p>
  `)
})

app.get('/error', (req, res) => {
  process.exit(1)
})

app.listen(8080)
